import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function PublicRoute({ children }) {
  // Get authentication status from custom hook
  const { isAuthenticated } = useAuth();

  // If authenticated, redirect to home page
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
