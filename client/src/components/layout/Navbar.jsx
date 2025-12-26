import { Link } from "react-router-dom";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../store/features/authSlice";

import Avatar from "../ui/Avatar";
import UserSearchDropdown from "./UserSearchDropdown";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAuth();

  // Determine home link based on authentication status
  const homeLink = isAuthenticated ? "/home" : "/";

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <header className="navbar fixed top-0 left-0 right-0 z-20 h-14 border-b bg-white">
      <div className="container flex h-full items-center justify-between">
        {/* Logo */}
        <Link to={homeLink} className="text-lg font-semibold no-underline">
          GuruDev
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4 text-sm">
          {!isAuthenticated && (
            <>
              <Link to="/login" className="hover:underline">
                Accedi
              </Link>

              <Link to="/register" className="btn btn-primary">
                Inizia
              </Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <UserSearchDropdown />

              <span className="hidden sm:block">
                Ciao,{" "}
                <span className="font-medium text-(--text)">
                  {user.username.charAt(0).toUpperCase() +
                    user.username.slice(1)}
                </span>
              </span>

              <Link to={`/profile/me`}>
                <Avatar
                  src={user.avatar}
                  username={user.username}
                  size={32}
                />
              </Link>

              <button
                onClick={handleLogout}
                className="btn btn-secondary"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
