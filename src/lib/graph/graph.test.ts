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
		strokeText: vi.fn(),
		measureText: vi.fn(() => ({ width: 40 })),
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

test("refit rescales positions and recenters the forces", async () => {
	const { buildGraph, createSimulation, refit, settle } = await import(
		"./index"
	);
	const graph = buildGraph([
		{ id: "a", label: "A", area: "backend", weight: 3, links: ["b"] },
		{ id: "b", label: "B", area: "backend", weight: 2, links: [] },
		{ id: "c", label: "C", area: "ai", weight: 1, links: ["a"] },
	]);
	const simulation = createSimulation(graph, 800, 400);
	settle(simulation, 100);
	refit(simulation, 400, 400);
	expect(simulation.bounds).toEqual({ width: 400, height: 400 });
	for (const node of simulation.nodes()) {
		expect(node.x).toBeGreaterThanOrEqual(node.radius);
		expect(node.x).toBeLessThanOrEqual(400 - node.radius);
	}
});

test("advance keeps integrating pointer forces after the graph has settled", async () => {
	const { advance, buildGraph, createSimulation, settle } = await import(
		"./index"
	);
	const graph = buildGraph([
		{ id: "a", label: "A", area: "backend", weight: 3, links: ["b"] },
		{ id: "b", label: "B", area: "backend", weight: 2, links: [] },
		{ id: "c", label: "C", area: "ai", weight: 1, links: ["a"] },
	]);
	const simulation = createSimulation(graph, 800, 400);
	settle(simulation, 300);
	while (simulation.alpha() > simulation.alphaMin()) simulation.tick();
	const options = { radius: 140, strength: 0.025, activeAlphaTarget: 0.02 };
	expect(advance(simulation, null, options)).toBe(false);
	const [node] = simulation.nodes();
	const before = node.x ?? 0;
	const pointer = { x: before + 60, y: node.y ?? 0 };
	for (let frame = 0; frame < 30; frame++)
		advance(simulation, pointer, options);
	expect(node.x).not.toBeCloseTo(before, 3);
});

test("a held pointer pulls nearby nodes in and lets them settle without jitter", async () => {
	const { advance, buildGraph, createSimulation, settle } = await import(
		"./index"
	);
	const graph = buildGraph([
		{ id: "a", label: "A", area: "backend", weight: 3, links: ["b"] },
		{ id: "b", label: "B", area: "backend", weight: 2, links: ["c"] },
		{ id: "c", label: "C", area: "ai", weight: 1, links: [] },
		{ id: "d", label: "D", area: "infra", weight: 1, links: ["a"] },
	]);
	const simulation = createSimulation(graph, 800, 400);
	settle(simulation, 300);
	const options = { radius: 140, strength: 0.025, activeAlphaTarget: 0.02 };
	const [node] = simulation.nodes();
	const pointer = { x: (node.x ?? 0) + 50, y: (node.y ?? 0) + 20 };
	const gap = () =>
		Math.hypot(pointer.x - (node.x ?? 0), pointer.y - (node.y ?? 0));
	const before = gap();
	for (let frame = 0; frame < 90; frame++)
		advance(simulation, pointer, options);
	expect(gap()).toBeLessThan(before);
	let maxStep = 0;
	for (let frame = 0; frame < 60; frame++) {
		const x = node.x ?? 0;
		const y = node.y ?? 0;
		advance(simulation, pointer, options);
		maxStep = Math.max(
			maxStep,
			Math.hypot((node.x ?? 0) - x, (node.y ?? 0) - y),
		);
	}
	expect(maxStep).toBeLessThan(0.5);
});

test("hub areas add one anchored hub per area with every technology linked to its hub", async () => {
	const { buildGraph, createSimulation, isHub, nodeAt, settle } = await import(
		"./index"
	);
	const areas = [
		{ id: "backend" as const, label: "Backend", token: "--area-backend" },
		{ id: "ai" as const, label: "AI & data", token: "--area-ai" },
	];
	const graph = buildGraph(
		[
			{ id: "a", label: "A", area: "backend", weight: 3, links: ["b"] },
			{ id: "b", label: "B", area: "backend", weight: 2, links: [] },
			{ id: "c", label: "C", area: "ai", weight: 1, links: [] },
		],
		areas,
	);
	expect(graph.nodes.filter(isHub)).toHaveLength(2);
	expect(graph.links.filter((link) => link.kind === "hub")).toHaveLength(3);
	const simulation = createSimulation(graph, 800, 400);
	settle(simulation, 300);
	const hubs = simulation.nodes().filter(isHub);
	const backendHub = hubs.find((hub) => hub.area === "backend");
	const aiHub = hubs.find((hub) => hub.area === "ai");
	expect(backendHub?.x ?? 0).toBeLessThan(400);
	expect(aiHub?.x ?? 0).toBeGreaterThan(400);
	const tech = simulation.nodes().find((node) => node.id === "c");
	expect(nodeAt(simulation, { x: tech?.x ?? 0, y: tech?.y ?? 0 }, 4)?.id).toBe(
		"c",
	);
	expect(
		nodeAt(simulation, { x: aiHub?.x ?? 0, y: aiHub?.y ?? 0 }, 4),
	).toBeUndefined();
});

test("toGraphData copies nodes and flattens link endpoints to ids", async () => {
	const { buildGraph, toGraphData } = await import("./index");
	const graph = buildGraph(
		[
			{ id: "a", label: "A", area: "backend", weight: 3, links: ["b"] },
			{ id: "b", label: "B", area: "backend", weight: 2, links: [] },
		],
		[{ id: "backend", label: "Backend", token: "--area-backend" }],
	);
	const data = toGraphData(graph);
	expect(data.nodes).toHaveLength(3);
	expect(data.nodes[0]).not.toBe(graph.nodes[0]);
	expect(
		data.links.map((link) => `${link.source}>${link.target}:${link.kind}`),
	).toEqual(
		expect.arrayContaining([
			"a>hub:backend:hub",
			"b>hub:backend:hub",
			"a>b:couse",
		]),
	);
});

test("hierarchy forces anchor hubs on opposite sides of the centre", async () => {
	const { buildGraph, hierarchyForceX, hierarchyForceY, toGraphData } =
		await import("./index");
	const data = toGraphData(
		buildGraph(
			[
				{ id: "a", label: "A", area: "backend", weight: 3, links: [] },
				{ id: "c", label: "C", area: "ai", weight: 1, links: [] },
			],
			[
				{ id: "backend", label: "Backend", token: "--area-backend" },
				{ id: "ai", label: "AI & data", token: "--area-ai" },
			],
		),
	);
	const extent = { width: 800, height: 400 };
	const x = hierarchyForceX(data.nodes, extent).x() as (
		node: unknown,
	) => number;
	const y = hierarchyForceY(data.nodes, extent).y() as (
		node: unknown,
	) => number;
	const backendHub = data.nodes.find((node) => node.id === "hub:backend");
	const aiHub = data.nodes.find((node) => node.id === "hub:ai");
	expect(x(backendHub)).toBeLessThan(0);
	expect(x(aiHub)).toBeGreaterThan(0);
	expect(y(backendHub)).toBeLessThan(0);
});
