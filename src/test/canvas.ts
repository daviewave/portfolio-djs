const fakeContext = () =>
	new Proxy({} as CanvasRenderingContext2D, {
		get: (_target, property) =>
			property === "measureText" ? () => ({ width: 40 }) : vi.fn(),
	});

export const stubCanvasContext = () => {
	HTMLCanvasElement.prototype.getContext = vi.fn(fakeContext) as never;
};
