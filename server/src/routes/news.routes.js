// Import the Router function from the express library
import { Router } from "express";
// Import the getNews controller function
import { getNews } from "../controllers/news.controller.js";

// Create a new router instance
const router = Router();

// Define a GET route for the root path and attach the getNews controller
router.get("/", getNews);

// Export the router as the default export
export default router;
