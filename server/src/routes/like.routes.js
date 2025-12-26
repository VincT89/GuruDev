import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  toggleLike,
  getLikeCount
} from "../controllers/like.controller.js";

const router = Router();

/**
 * Toggle like / unlike
 */
router.post("/posts/:postId/like", requireAuth, toggleLike);

/**
 * Get like count
 */
router.get("/posts/:postId/likes", getLikeCount);

export default router;
