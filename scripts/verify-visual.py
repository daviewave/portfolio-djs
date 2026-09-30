#!/usr/bin/env python3
"""Drive the dev server with firefox-devtools-mcp and capture evidence.

Runs `npm run dev` and the MCP server in one process so both share a network
namespace, then writes screenshots, console output, CLS and axe results to
dist/verify/. Requires the firefox-devtools-mcp checkout at MCP_DIR.
"""

import asyncio
import json
import os
import subprocess
import sys
import time
import urllib.request
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
MCP_DIR = Path("/var/home/slave/github/claude-code/firefox-mcp-plugin")
PORT = "3000"
OUT = REPO / "dist" / "verify"
AXE = REPO / "node_modules" / "axe-core" / "axe.min.js"
WIDTHS = {"desk": (1440, 900), "mob": (390, 844)}

sys.path.insert(0, str(MCP_DIR / ".venv" / "lib64" / "python3.14" / "site-packages"))
from mcp import ClientSession, StdioServerParameters  # noqa: E402
from mcp.client.stdio import stdio_client  # noqa: E402

CLS_JS = """() => new Promise(resolve => {
  let total = 0;
  const observer = new PerformanceObserver(list => {
    for (const entry of list.getEntries()) if (!entry.hadRecentInput) total += entry.value;
  });
  observer.observe({ type: "layout-shift", buffered: true });
  window.scrollTo(0, document.body.scrollHeight);
  setTimeout(() => { window.scrollTo(0, 0); setTimeout(() => { observer.disconnect(); resolve(total); }, 1200); }, 1200);
})"""


def node_env():
	env = dict(os.environ)
	env["PATH"] = "/home/linuxbrew/.linuxbrew/bin:" + env["PATH"]
	return env


def start_dev_server():
	proc = subprocess.Popen(
		["npm", "run", "dev"], cwd=REPO, env=node_env(),
		stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
	)
	for _ in range(80):
		try:
			urllib.request.urlopen(f"http://localhost:{PORT}", timeout=1)
			return proc
		except Exception:
			time.sleep(0.5)
	proc.terminate()
	sys.exit("dev server never came up")


def server_params():
	env = node_env()
	env["PLAYWRIGHT_BROWSERS_PATH"] = str(MCP_DIR / ".playwright-browsers")
	return StdioServerParameters(
		command=str(MCP_DIR / ".venv" / "bin" / "python"),
		args=["-m", "firefox_devtools_mcp.main", "--headless", "--isolated", "--filesystem-root", str(OUT)],
		env=env,
	)


def text_of(result):
	return result.content[0].text


SWEEP_JS = """() => new Promise(resolve => {
  const step = () => {
    const bottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 2;
    if (bottom) { window.scrollTo(0, 0); setTimeout(() => resolve(true), 400); return; }
    window.scrollBy(0, Math.round(window.innerHeight * 0.6));
    setTimeout(step, 180);
  };
  step();
})"""

FONT_PROBE_JS = """() => {
  const probe = (settings) => {
    const span = document.createElement("span");
    span.textContent = "iiiiii mmmmmm";
    span.style.cssText = `font-family: "Recursive Variable"; font-size: 40px; font-variation-settings: ${settings}; position: absolute; visibility: hidden; white-space: nowrap;`;
    document.body.appendChild(span);
    const width = span.getBoundingClientRect().width;
    span.remove();
    return width;
  };
  return {
    bodyFamily: getComputedStyle(document.body).fontFamily,
    bodyVariation: getComputedStyle(document.body).fontVariationSettings,
    h1Variation: getComputedStyle(document.querySelector("h1")).fontVariationSettings,
    loadedFaces: [...document.fonts].map(f => `${f.family} ${f.status}`),
    widthMono0: probe('"MONO" 0'),
    widthMono1: probe('"MONO" 1'),
  };
}"""


async def sweep(call):
	await call("evaluate_script", function=SWEEP_JS, timeout=30000)


async def capture_theme_pair(call, name, width, height):
	await call("resize_page", width=width, height=height)
	await sweep(call)
	for theme in ("light", "dark"):
		await call("evaluate_script", function=f'() => {{ document.documentElement.dataset.theme = "{theme}"; }}')
		await asyncio.sleep(0.6)
		await call("take_screenshot", fullPage=True, filePath=str(OUT / f"{name}-{theme}"))


async def run_axe(call):
	if not AXE.exists():
		return "axe-core not installed"
	await call("evaluate_script", function=f"() => {{ const s = document.createElement('script'); s.textContent = {json.dumps(AXE.read_text())}; document.head.appendChild(s); }}")
	return await call("evaluate_script", function="async () => { const r = await axe.run(); return r.violations.map(v => ({id: v.id, impact: v.impact, nodes: v.nodes.length, help: v.help})); }", timeout=60000)


async def drive():
	async with stdio_client(server_params()) as (read, write):
		async with ClientSession(read, write) as session:
			await session.initialize()

			async def call(name, **kwargs):
				return text_of(await session.call_tool(name, kwargs))

			await call("navigate_page", url=f"http://localhost:{PORT}")
			await asyncio.sleep(2)
			report = {"console": await call("list_console_messages", types=["error", "warning"])}
			report["fonts"] = await call("evaluate_script", function=FONT_PROBE_JS)
			for name, (width, height) in WIDTHS.items():
				await capture_theme_pair(call, name, width, height)
			await call("resize_page", width=1440, height=900)
			await call("evaluate_script", function='() => { document.documentElement.dataset.theme = "dark"; }')
			report["cls"] = await call("evaluate_script", function=CLS_JS, timeout=10000)
			report["axe"] = await run_axe(call)
			await call("emulate", reducedMotion="reduce")
			await call("navigate_page", type="reload")
			await asyncio.sleep(1.5)
			await call("take_screenshot", fullPage=True, filePath=str(OUT / "desk-reduced-motion"))
			report["console_after"] = await call("list_console_messages", types=["error", "warning"])
			return report


def main():
	OUT.mkdir(parents=True, exist_ok=True)
	dev = start_dev_server()
	try:
		report = asyncio.run(drive())
	finally:
		dev.terminate()
	for key, value in report.items():
		print(f"=== {key} ===\n{value}\n")


if __name__ == "__main__":
	main()
