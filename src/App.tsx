import { domAnimation, LazyMotion } from "motion/react";
import { CursorLight, ThemeProvider } from "@/components";
import { HomePage } from "@/pages/Home/HomePage";

const skipLinkClass =
	"sr-only focus:not-sr-only focus:fixed focus:left-[1rem] focus:top-[1rem] focus:z-50 focus:rounded-[0.25rem] focus:bg-raised focus:px-[1rem] focus:py-[0.5rem] focus:text-ink";

export default function App() {
	return (
		<ThemeProvider>
			<LazyMotion features={domAnimation} strict>
				<a href="#main" className={skipLinkClass}>
					Skip to content
				</a>
				<CursorLight />
				<HomePage />
			</LazyMotion>
		</ThemeProvider>
	);
}
