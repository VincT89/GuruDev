import api from "../services/axios";

/**
 * Get comments for a post
 */
export function getComments(postId) {
  return api.get(`/posts/${postId}/comments`);
}

/**
 * Create comment
 */
export function createComment(postId, data) {
  return api.post(`/posts/${postId}/comments`, data);
}

/**
 * Delete comment
 */
export function deleteComment(commentId) {
  return api.delete(`/comments/${commentId}`);
}
