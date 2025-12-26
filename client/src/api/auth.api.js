import api from "../services/axios";

/**
 * Register
 */
export function register(data) {
  return api.post("/auth/register", data);
}

/**
 * Login
 */
export function login(data) {
  return api.post("/auth/login", data);
}

/**
 * Get current user
 */
export function getMe() {
  return api.get("/auth/me");
}
