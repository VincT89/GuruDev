// Import the Router function from the express library
import { Router } from "express";

// Import controller functions for authentication
import { register, login, me, logout } from "../controllers/auth.controller.js";

// Import middleware to require authentication
import { requireAuth } from "../middleware/auth.js";

// Create a new router instance
const router = Router();

// Route for user registration
// Handles POST requests to /register and calls the register controller
router.post("/register", register);

// Route for user login
// Handles POST requests to /login and calls the login controller
router.post("/login", login);

// Route to get the authenticated user's information
// Handles GET requests to /me, requires authentication, and calls the me controller
router.get("/me", requireAuth, me);

// Route for user logout
// Handles POST requests to /logout, requires authentication, and calls the logout controller
router.post("/logout", requireAuth, logout);

// Export the router to be used in other parts of the application
export default router;
