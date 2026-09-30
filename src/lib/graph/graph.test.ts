import type { Technology } from "@/content/types";
import type { Palette } from "./index";
import {
	applyPointerForce,
	buildGraph,
	createSimulation,
	drawGraph,
	settle,
} from "./index";

const tech = (
	id: string,
	area: Technology["area"],
	weight: Technology["weight"],
	links: string[] = [],
): Technology => ({
	id,
	label: id,
	area,
	weight,
	links,
});

const fixture: Technology[] = [
	tech("django", "backend", 3, ["postgresql", "celery"]),
	tech("postgresql", "ai", 3, ["django"]),
	tech("celery", "backend", 2, ["redis", "celery", "ghost"]),
	tech("redis", "ai", 1),
	tech("react", "frontend", 3, ["typescript"]),
	tech("typescript", "frontend", 3),
	tech("nginx", "infra", 1),
	tech("docker", "infra", 2),
	tech("terraform", "infra", 2),
];

const palette: Palette = {
	ink: "ink",
	muted: "muted",
	line: "line",
	areas: { backend: "b", frontend: "f", ai: "a", infra: "i" },
};

const fakeContext = () => {
	const mocks = {
		setTransform: vi.fn(),
		clearRect: vi.fn(),
		beginPath: vi.fn(),
		moveTo: vi.fn(),
		lineTo: vi.fn(),
		stroke: vi.fn(),
		arc: vi.fn(),
		fill: vi.fn(),
		fillText: vi.fn(),
	};
	const state = {
		globalAlpha: 1,
		strokeStyle: "",
		fillStyle: "",
		lineWidth: 1,
		font: "",
		textBaseline: "alphabetic",
	};
	return {
		mocks,
		ctx: { ...mocks, ...state } as unknown as CanvasRenderingContext2D,
	};
};

describe("buildGraph", () => {
	const graph = buildGraph(fixture);

	test("one node per technology with weight-based radius", () => {
		expect(graph.nodes).toHaveLength(fixture.length);
		expect(graph.nodes.find((n) => n.id === "django")?.radius).toBe(
			4 + 3 * 2.5,
		);
		expect(graph.nodes.find((n) => n.id === "redis")?.radius).toBe(4 + 1 * 2.5);
	});

	test("co-use links are undirected, deduplicated and skip unknown or self ids", () => {
		const couse = graph.links.filter((l) => l.kind === "couse");
		const pairs = couse.map((l) => [l.source, l.target].sort().join("-"));
		expect(pairs).toEqual(
			expect.arrayContaining([
				"django-postgresql",
				"celery-django",
				"celery-redis",
				"react-typescript",
			]),
		);
		expect(pairs).toHaveLength(new Set(pairs).size);
		expect(pairs.some((p) => p.includes("ghost"))).toBe(false);
		expect(pairs).not.toContain("celery-celery");
	});

	test("isolated technologies get area links so no node is alone", () => {
		const linked = new Set(
			graph.links.flatMap((l) => [l.source as string, l.target as string]),
		);
		for (const node of graph.nodes) expect(linked.has(node.id)).toBe(true);
		const nginxLinks = graph.links.filter(
			(l) =>
				l.kind === "area" && (l.source === "nginx" || l.target === "nginx"),
		);
		expect(nginxLinks.length).toBeGreaterThan(0);
		expect(nginxLinks.length).toBeLessThanOrEqual(2);
		expect(
			graph.links.filter(
				(l) =>
					l.kind === "area" && (l.source === "django" || l.target === "django"),
			),
		).toHaveLength(0);
	});
});

describe("createSimulation and settle", () => {
	test("settling moves nodes and keeps them inside the bounds", () => {
		const graph = buildGraph(fixture);
		const sim = createSimulation(graph, 400, 300);
		settle(sim);
		for (const node of graph.nodes) {
			expect(node.x).toBeGreaterThanOrEqual(node.radius);
			expect(node.x).toBeLessThanOrEqual(400 - node.radius);
			expect(node.y).toBeGreaterThanOrEqual(node.radius);
			expect(node.y).toBeLessThanOrEqual(300 - node.radius);
		}
		const distinct = new Set(
			graph.nodes.map((n) => `${n.x?.toFixed(1)},${n.y?.toFixed(1)}`),
		);
		expect(distinct.size).toBe(graph.nodes.length);
		expect(sim.bounds).toEqual({ width: 400, height: 300 });
	});
});

describe("applyPointerForce", () => {
	test("pulls nodes inside the radius toward the pointer and ignores far nodes", () => {
		const graph = buildGraph(fixture);
		const near = graph.nodes[0];
		const far = graph.nodes[1];
		Object.assign(near, { x: 100, y: 100, vx: 0, vy: 0 });
		Object.assign(far, { x: 900, y: 900, vx: 0, vy: 0 });
		applyPointerForce([near, far], { x: 140, y: 100 }, 80, 0.1);
		expect(near.vx).toBeGreaterThan(0);
		expect(far.vx).toBe(0);
		expect(far.vy).toBe(0);
	});
});

describe("drawGraph", () => {
	test("draws every node, every label and every link", () => {
		const graph = buildGraph(fixture);
		const sim = createSimulation(graph, 400, 300);
		settle(sim, 50);
		const { ctx, mocks } = fakeContext();
		drawGraph(ctx, graph, {
			width: 400,
			height: 300,
			dpr: 2,
			palette,
			hovered: "django",
			pointer: { x: 0, y: 0 },
			labelFont: "12px Recursive",
		});
		expect(mocks.setTransform).toHaveBeenCalledWith(2, 0, 0, 2, 0, 0);
		expect(mocks.arc).toHaveBeenCalledTimes(graph.nodes.length + 1);
		expect(mocks.fillText).toHaveBeenCalledTimes(
			graph.nodes.filter((n) => n.radius > 4 + 2.5 || n.id === "django").length,
		);
		expect(mocks.stroke.mock.calls.length).toBeGreaterThanOrEqual(
			graph.links.length,
		);
	});

	test("shows a weight-1 label when the pointer is near it", () => {
		const graph = buildGraph(fixture);
		const redis = graph.nodes.find((n) => n.id === "redis");
		if (!redis) throw new Error("fixture missing redis");
		for (const node of graph.nodes) Object.assign(node, { x: 1000, y: 1000 });
		Object.assign(redis, { x: 50, y: 50 });
		const { ctx, mocks } = fakeContext();
		drawGraph(ctx, graph, {
			width: 400,
			height: 300,
			dpr: 1,
			palette,
			pointer: { x: 60, y: 60 },
			labelFont: "12px x",
		});
		const labels = mocks.fillText.mock.calls.map((call) => call[0]);
		expect(labels).toContain("redis");
		expect(labels).not.toContain("nginx");
	});
});
