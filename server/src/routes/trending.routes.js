// Import the Router function from the express library
import { Router } from "express";
// Import the getTrending controller function
import { getTrending } from "../controllers/trending.controller.js";

// Create a new router instance
const router = Router();

// Define a GET route at the root path that uses the getTrending controller
router.get("/", getTrending);

// Export the router as the default export
export default router;
