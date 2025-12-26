import { Router } from "express"; // Import the Router from Express
import { requireAuth } from "../middleware/auth.js"; // Import authentication middleware
import { upload } from "../middleware/upload.js"; // Import file upload middleware

import {
	getUsers, // Controller to get the list of users
	searchUsers, // Controller to search users
	getUserById, // Controller to get a user by ID
	updateProfile, // Controller to update the current user's profile
	uploadAvatar, // Controller to handle avatar upload
} from "../controllers/user.controller.js";

const router = Router(); // Create a new router instance

/* ---------------- USERS ---------------- */

// Search users (used in toolbar)
router.get("/search", requireAuth, searchUsers);

// Public user profile by ID
router.get("/:id", requireAuth, getUserById);

// Get the list of all users
router.get("/", requireAuth, getUsers);

/* ---------------- ME ---------------- */

// Update the current user's profile
router.patch("/me", requireAuth, updateProfile);

// Upload avatar for the current user
router.post("/me/avatar", requireAuth, upload.single("avatar"), uploadAvatar);

export default router; // Export the router as default
