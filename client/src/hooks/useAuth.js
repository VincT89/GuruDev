import { useAppSelector } from "./useAppSelector";

// Custom hook to access authentication state from the Redux store
export function useAuth() {
	// Destructure user, token, and status from the auth slice of the state
	const { user, token, status } = useAppSelector((state) => state.auth);

	return {
		user, // The current authenticated user object
		token, // The authentication token
		isAuthenticated: Boolean(user && token), // True if both user and token exist
		isLoading: status === "loading", // True if the authentication status is loading
	};
}
