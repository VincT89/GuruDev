// Import React hooks and routing utilities
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Import custom hooks for dispatching actions and authentication state
import { useAppDispatch } from "./hooks/useAppDispatch";
import { useAuth } from "./hooks/useAuth";
import { fetchMe } from "./store/features/authSlice";

// Import route protection components
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";

// Import layout components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ChatWidget from "./components/chat/ChatWidget";

// Import page components
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PublicHome from "./pages/PublicHome";
import ProfileMe from "./pages/ProfileMe";
import ProfileUser from "./pages/ProfileUser";
import PostPage from "./pages/PostPage";

// Main App component
export default function App() {
	// Get dispatch function from custom hook
	const dispatch = useAppDispatch();
	// Get authentication state and token from custom hook
	const { token, isAuthenticated } = useAuth();

	// Fetch user data when token changes (i.e., on login)
	useEffect(() => {
		if (token) {
			dispatch(fetchMe());
		}
	}, [token, dispatch]);

	return (
		// Main container with flex layout and minimum height
		<div className="flex min-h-screen flex-col">
			{/* Navigation bar at the top */}
			<Navbar />

			{/* Chat widget, visible only if authenticated */}
			{isAuthenticated && <ChatWidget />}

			{/* Main content area */}
			<main className="flex-1">
				<Routes>
					{/* Public homepage route */}
					<Route
						path="/"
						element={
							<PublicRoute>
								<PublicHome />
							</PublicRoute>
						}
					/>

					{/* Authenticated home route */}
					<Route
						path="/home"
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>

					{/* Single post page, protected */}
					<Route
						path="/posts/:id"
						element={
							<ProtectedRoute>
								<PostPage />
							</ProtectedRoute>
						}
					/>

					{/* Personal profile page, protected */}
					<Route
						path="/profile/me"
						element={
							<ProtectedRoute>
								<ProfileMe />
							</ProtectedRoute>
						}
					/>

					{/* Public user profile page, protected */}
					<Route
						path="/profile/:id"
						element={
							<ProtectedRoute>
								<ProfileUser />
							</ProtectedRoute>
						}
					/>

					{/* Login page, public route */}
					<Route
						path="/login"
						element={
							<PublicRoute>
								<Login />
							</PublicRoute>
						}
					/>
					{/* Register page, public route */}
					<Route
						path="/register"
						element={
							<PublicRoute>
								<Register />
							</PublicRoute>
						}
					/>
				</Routes>
			</main>

			{/* Footer at the bottom */}
			<Footer />
		</div>
	);
}
