import { createElement, forwardRef, useImperativeHandle } from "react";

interface MockNode {
	id: string;
	kind: string;
}

interface MockProps {
	graphData?: { nodes: MockNode[] };
	nodeThreeObject?: unknown;
	cooldownTicks?: number;
	warmupTicks?: number;
	onNodeClick?: (node: MockNode) => void;
}

const chainable = () => ({ strength: vi.fn(), distance: vi.fn() });

const ForceGraphMock = forwardRef<unknown, MockProps>((props, ref) => {
	useImperativeHandle(ref, () => ({
		d3Force: vi.fn(() => chainable()),
		pauseAnimation: vi.fn(),
		resumeAnimation: vi.fn(),
		zoomToFit: vi.fn(),
	}));
	const nodes = props.graphData?.nodes ?? [];
	return createElement(
		"div",
		{
			"data-testid": "force-graph",
			"data-mode": props.nodeThreeObject ? "3d" : "2d",
			"data-nodes": nodes.length,
			"data-cooldown-ticks": String(props.cooldownTicks),
			"data-warmup-ticks": String(props.warmupTicks),
		},
		nodes.map((node) =>
			createElement(
				"button",
				{
					key: node.id,
					type: "button",
					"data-node-id": node.id,
					"data-node-kind": node.kind,
					onClick: () => props.onNodeClick?.(node),
				},
				node.id,
			),
		),
	);
});

export default ForceGraphMock;
