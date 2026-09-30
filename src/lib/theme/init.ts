export const THEME_INIT_SCRIPT = `(() => {
				let theme = "light";
				try {
					const stored = localStorage.getItem("theme");
					if (stored === "light" || stored === "dark") theme = stored;
					else if (matchMedia("(prefers-color-scheme: dark)").matches) theme = "dark";
				} catch {}
				document.documentElement.dataset.theme = theme;
			})();`;
