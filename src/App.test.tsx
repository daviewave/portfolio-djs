import { screen } from "@testing-library/react";
import App from "./App";
import { renderApp } from "./test/render";

test("renders the name", () => {
	renderApp(<App />);
	expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
		"David Silveira",
	);
});
