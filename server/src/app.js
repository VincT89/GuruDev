// Import express framework
import express from "express";
// Import CORS middleware
import cors from "cors";
// Import Helmet for security headers
import helmet from "helmet";

// Import API routes
import apiRoutes from "./routes/index.js";
// Import custom middleware for 404 and error handling
import { notFound, errorHandler } from "./middleware/index.js";

// Create an Express application
const app = express();

// Use Helmet to set secure HTTP headers
app.use(helmet());
// Enable CORS for requests from http://localhost:5173
app.use(cors({ origin: "http://localhost:5173" }));
// Parse incoming JSON requests
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
	// Respond with a simple message
	res.send("Hello, World!");
});

// Mount API routes under /api
app.use("/api", apiRoutes);

// Handle 404 errors
app.use(notFound);
// Handle other errors
app.use(errorHandler);

// Export the Express app
export default app;
