import api from "../services/axios";

// Creates a new post
export function createPost(data) {
  return api.post("/posts", {
    title: data.title,
    content: data.content,
    status: data.status || "published",
  });
}

// Uploads a cover image for a post
export function uploadPostCover(postId, formData) {
  return api.post(`/posts/${postId}/cover`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

//  Deletes a post by ID
export function deletePost(postId) {
  return api.delete(`/posts/${postId}`);
}

// Fetches a post by ID
export function getPostById(id) {
  return api.get(`/posts/id/${id}`);
}
