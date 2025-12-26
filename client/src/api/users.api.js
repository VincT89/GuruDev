import api from "../services/axios";

/* ---------------- USERS ---------------- */

/**
 * Search users (toolbar)
 */
export function searchUsers(query) {
  return api.get(`/users/search?q=${query}`);
}

/**
 * Get public user profile
 */
export function getUserById(userId) {
  return api.get(`/users/${userId}`);
}

/* ---------------- FOLLOW ---------------- */

/**
 * Toggle follow / unfollow user
 */
export function toggleFollow(userId) {
  return api.post(`/users/${userId}/follow`);
}
