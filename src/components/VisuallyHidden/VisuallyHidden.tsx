import type { ReactNode } from "react";

interface VisuallyHiddenProps {
	children: ReactNode;
	as?: "span" | "ul" | "div";
}

export function VisuallyHidden({ children, as = "span" }: VisuallyHiddenProps) {
	const Tag = as;
	return <Tag className="sr-only">{children}</Tag>;
}
