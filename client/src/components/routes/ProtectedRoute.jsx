import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  // Get authentication status from custom hook
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  // If not authenticated, redirect to home page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
