import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  toggleFollow,
  getFollowers,
  getFollowing,
} from "../controllers/follow.controller.js";

const router = Router();

/**
 * Follow / unfollow user
 */
router.post("/users/:id/follow", requireAuth, toggleFollow);

/**
 * Get followers
 */
router.get("/users/:id/followers", getFollowers);

/**
 * Get following
 */
router.get("/users/:id/following", getFollowing);

export default router;
