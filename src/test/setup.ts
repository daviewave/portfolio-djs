import "@testing-library/jest-dom/vitest";

class ObserverStub {
	observe = vi.fn();
	unobserve = vi.fn();
	disconnect = vi.fn();
	takeRecords = vi.fn(() => []);
}

beforeEach(() => {
	vi.stubGlobal("IntersectionObserver", ObserverStub);
	vi.stubGlobal("ResizeObserver", ObserverStub);
	Object.defineProperty(window, "matchMedia", {
		writable: true,
		value: vi.fn().mockImplementation((query: string) => ({
			matches: false,
			media: query,
			onchange: null,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			addListener: vi.fn(),
			removeListener: vi.fn(),
			dispatchEvent: vi.fn(),
		})),
	});
	Element.prototype.scrollIntoView = vi.fn();
});
