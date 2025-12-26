import api from "../services/axios";

/**
 * Toggle like / unlike
 */
export function toggleLike(postId) {
  return api.post(`/posts/${postId}/like`);
}

/**
 * Get like count
 */
export function getLikeCount(postId) {
  return api.get(`/posts/${postId}/likes`);
}
