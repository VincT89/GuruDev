import { useSelector } from "react-redux";

/**
 * Custom hook that wraps the Redux `useSelector` hook.
 * Allows selecting a specific part of the Redux state using a selector function.
 *
 * @param {Function} selector - A function that selects a part of the Redux state.
 * @returns {*} The selected state.
 */
export function useAppSelector(selector) {
	return useSelector(selector);
}
