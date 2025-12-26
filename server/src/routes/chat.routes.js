// Import the Router function from express to create route handlers
import { Router } from "express";
// Import the authentication middleware to protect routes
import { requireAuth } from "../middleware/auth.js";
// Import controller functions for chat operations
import {
	getMyConversations,
	createConversation,
	getMessages,
	deleteConversation,
} from "../controllers/chat.controller.js";

// Create a new router instance
const router = Router();

// Route to get all conversations for the authenticated user
router.get("/conversations", requireAuth, getMyConversations);

// Route to create a new conversation for the authenticated user
router.post("/conversations", requireAuth, createConversation);

// Route to get all messages from a specific conversation for the authenticated user
router.get("/conversations/:id/messages", requireAuth, getMessages);

// Route to delete a specific conversation for the authenticated user
router.delete("/conversations/:id", requireAuth, deleteConversation);

// Export the router to be used in other parts of the application
export default router;
