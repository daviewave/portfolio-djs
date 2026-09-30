import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";

import theme from "../themes/default";
import GlobalStyles from "./globals";

const ThemeToggleContext = createContext({ mode: "dark", toggle: () => {} });

export const useThemeToggle = () => useContext(ThemeToggleContext);

const Theme = ({ children }) => {
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    // The pre-hydration script in _document set the attribute; adopt it.
    setMode(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const toggle = useCallback(() => {
    setMode((current) => {
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* private browsing */
      }
      return next;
    });
  }, []);

  return (
    <ThemeToggleContext.Provider value={{ mode, toggle }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};

export default Theme;
