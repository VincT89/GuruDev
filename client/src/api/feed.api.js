import api from "../services/axios";

// Fetches a paginated feed of posts
export function getFeed(page = 1, limit = 3) {
  return api.get(`/feed?page=${page}&limit=${limit}`);
}
