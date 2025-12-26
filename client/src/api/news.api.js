import api from "../services/axios";

// Fetches news articles
export function getNews() {
  return api.get("/news");
}
