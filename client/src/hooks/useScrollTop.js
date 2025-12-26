import { useEffect } from "react";

// Custom hook to scroll the window to the top whenever dependencies change
export function useScrollTop(deps = []) {
	useEffect(() => {
		// Scrolls the window to the top-left corner (0, 0)
		window.scrollTo(0, 0);
	}, deps); // Effect runs whenever any value in 'deps' changes
}
