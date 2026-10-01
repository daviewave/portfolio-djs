import { createTouchLight, driftPoint } from "./touchLight";

test("the resting light stays on screen and moves as the page scrolls", () => {
	const points = [0, 300, 900, 2400, 9000].map((y) => driftPoint(y, 390, 844));
	for (const point of points) {
		expect(point.x).toBeGreaterThan(0);
		expect(point.x).toBeLessThan(390);
		expect(point.y).toBeGreaterThan(0);
		expect(point.y).toBeLessThan(844);
	}
	expect(
		new Set(points.map((point) => Math.round(point.x))).size,
	).toBeGreaterThan(1);
});

test("the light eases to a touch, then returns to its scroll path", () => {
	let time = 0;
	const light = createTouchLight(() => time);
	const rest = light.step();
	expect(rest).toEqual(driftPoint(window.scrollY, innerWidth, innerHeight));
	expect(light.step()).toBeNull();

	light.onTouch({ clientX: 10, clientY: 20 } as unknown as Event);
	let point = light.step();
	for (let frame = 0; frame < 200; frame += 1) point = light.step() ?? point;
	expect(point?.x).toBeCloseTo(10, 0);
	expect(point?.y).toBeCloseTo(20, 0);

	time = 5000;
	for (let frame = 0; frame < 200; frame += 1) point = light.step() ?? point;
	expect(point?.x).toBeCloseTo(rest?.x ?? 0, 0);
});
