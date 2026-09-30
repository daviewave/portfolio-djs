import { useCallback, useState } from "react";
import type { GraphMode } from "./StackGraph.types";

const STORAGE_KEY = "graph-mode";

const readStoredMode = (): GraphMode => {
	try {
		return localStorage.getItem(STORAGE_KEY) === "3d" ? "3d" : "2d";
	} catch {
		return "2d";
	}
};

const storeMode = (mode: GraphMode) => {
	try {
		localStorage.setItem(STORAGE_KEY, mode);
	} catch {
		/* storage unavailable: the choice lasts for this visit */
	}
};

export const useGraphMode = () => {
	const [mode, setMode] = useState<GraphMode>(readStoredMode);
	const choose = useCallback((next: GraphMode) => {
		setMode(next);
		storeMode(next);
	}, []);
	return { mode, choose };
};
