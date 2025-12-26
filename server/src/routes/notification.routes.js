import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  getNotifications,
  markAllAsRead,
  markOneAsRead,
} from "../controllers/notification.controller.js";

const router = Router();

/**
 * GET /api/notifications
 * Get current user's notifications
 */
router.get("/", requireAuth, getNotifications);

/**
 * PATCH /api/notifications/read
 * Mark ALL notifications as read
 */
router.patch("/read", requireAuth, markAllAsRead);

/**
 * PATCH /api/notifications/:id/read
 * Mark ONE notification as read
 */
router.patch("/:id/read", requireAuth, markOneAsRead);

export default router;
