import api from "../services/axios";

/**
 * Fetch trending items
 */
export function getTrending() {
  return api.get("/trending");
}
