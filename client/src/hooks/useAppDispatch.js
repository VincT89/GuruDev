import { useDispatch } from "react-redux";

/**
 * Custom hook that returns the Redux store's dispatch function.
 * Useful for dispatching actions within React components.
 *
 * @returns {Function} The Redux dispatch function.
 */
export function useAppDispatch() {
	return useDispatch();
}
