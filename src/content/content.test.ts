import { profile, projects, roles, technologies } from "./index";

const isBlank = (value: unknown) =>
	typeof value === "string" && value.trim() === "";

const hasNoBlankFields = (record: object) =>
	Object.values(record).every((v) => !isBlank(v));

test("every technology link points at an existing technology", () => {
	const ids = new Set(technologies.map((t) => t.id));
	for (const tech of technologies) {
		for (const link of tech.links) {
			expect(ids.has(link), `${tech.id} links to unknown ${link}`).toBe(true);
			expect(link).not.toBe(tech.id);
		}
	}
});

test("no role, project or intro sentence has an empty field", () => {
	for (const role of roles) expect(hasNoBlankFields(role)).toBe(true);
	for (const project of projects) {
		expect(hasNoBlankFields(project)).toBe(true);
		expect(project.tags.length).toBeGreaterThan(0);
	}
	expect(profile.intro.length).toBe(3);
	for (const sentence of profile.intro) expect(isBlank(sentence)).toBe(false);
});

test("roles are ordered newest first", () => {
	const years = roles.map((r) => Number(r.year));
	expect(years).toEqual([...years].sort((a, b) => b - a));
});

test("at least 25 technologies covering all four areas", () => {
	expect(technologies.length).toBeGreaterThanOrEqual(25);
	const covered = new Set(technologies.map((t) => t.area));
	expect(covered).toEqual(new Set(["backend", "frontend", "ai", "infra"]));
	expect(new Set(technologies.map((t) => t.id)).size).toBe(technologies.length);
});

test("every technology has a written detail with at least one place it was used", async () => {
	const { technologies, technologyDetails } = await import("./index");
	for (const technology of technologies) {
		const detail = technologyDetails[technology.id];
		expect(detail, technology.id).toBeDefined();
		expect(detail?.summary.trim().length).toBeGreaterThan(20);
		expect(detail?.usedIn.length).toBeGreaterThan(0);
	}
});

test("the now section has narrative paragraphs and three recent wins with detail", async () => {
	const { now } = await import("./index");
	expect(now.paragraphs.length).toBeGreaterThanOrEqual(2);
	expect(now.recent).toHaveLength(3);
	for (const win of now.recent) {
		expect(win.headline.trim().length).toBeGreaterThan(8);
		expect(win.detail.trim().length).toBeGreaterThan(40);
	}
});
