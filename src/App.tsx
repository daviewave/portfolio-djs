import { domAnimation, LazyMotion } from "motion/react";
import { ThemeProvider } from "@/components";
import { homeStyles } from "@/pages/Home/Home.styles";
import { HomePage } from "@/pages/Home/HomePage";

export default function App() {
	return (
		<ThemeProvider>
			<LazyMotion features={domAnimation} strict>
				<a href="#main" className={homeStyles.skipLink}>
					Skip to content
				</a>
				<HomePage />
			</LazyMotion>
		</ThemeProvider>
	);
}
