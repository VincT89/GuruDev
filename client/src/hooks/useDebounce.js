import { useRef } from "react";
import { debounce } from "../utils/debounce";

// Custom React hook that returns a debounced version of the provided function
export function useDebounce(fn, delay) {
	// useRef is used to persist the debounced function instance across renders
	const debouncedFn = useRef(debounce(fn, delay));
	// Return the debounced function
	return debouncedFn.current;
}
