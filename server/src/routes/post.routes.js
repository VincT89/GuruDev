// Import Router from express
import { Router } from "express";
// Import authentication middleware
import { requireAuth } from "../middleware/auth.js";
// Import file upload middleware
import { upload } from "../middleware/upload.js";
// Import post controller functions
import {
	createPost,
	getPosts,
	getPostBySlug,
	getPostById,
	updatePost,
	uploadPostCover,
	deletePost,
} from "../controllers/post.controller.js";

// Create a new router instance
const router = Router();

// Public routes

// Get all posts
router.get("/", getPosts);
// Get a post by its ID
router.get("/id/:id", getPostById);
// Get a post by its slug
router.get("/:slug", getPostBySlug);

// Protected routes (require authentication)

// Create a new post
router.post("/", requireAuth, createPost);
// Update a post by its ID
router.patch("/:id", requireAuth, updatePost);
// Upload a cover image for a post
router.post("/:id/cover", requireAuth, upload.single("cover"), uploadPostCover);
// Delete a post by its ID
router.delete("/:id", requireAuth, deletePost);

// Export the router as the default export
export default router;
