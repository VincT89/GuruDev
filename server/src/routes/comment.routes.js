import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  createComment,
  getCommentsByPost,
  deleteComment
} from "../controllers/comment.controller.js";

/**
 * Express router for comment-related routes
 */
const router = Router();

/**
 * Create a comment on a post
 * POST /api/posts/:postId/comments
 * Auth required
 */
router.post("/posts/:postId/comments", requireAuth, createComment);

/**
 * Get comments for a post
 * GET /api/posts/:postId/comments
 * Public
 */
router.get("/posts/:postId/comments", getCommentsByPost);

/**
 * Delete a comment
 * DELETE /api/comments/:id
 * Auth required (comment author or post author)
 */
router.delete("/comments/:id", requireAuth, deleteComment);

export default router;
