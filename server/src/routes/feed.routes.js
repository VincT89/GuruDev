import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getFeed } from "../controllers/feed.controller.js";

const router = Router();

/**
 * Personalized feed
 */
router.get("/feed", requireAuth, getFeed);

export default router;
