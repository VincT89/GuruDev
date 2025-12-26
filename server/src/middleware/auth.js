import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

/**
 * Middleware to authenticate JWT tokens and attach user to request.
 *
 * - Reads the JWT from the Authorization header (expects "Bearer <token>").
 * - Verifies the token using the secret from environment variables.
 * - Fetches the user from the database using the user ID from the token payload.
 * - If the user exists, attaches the user object (without passwordHash) to req.user.
 * - If authentication fails at any step, responds with 401 Unauthorized.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export async function requireAuth(req, res, next) {
	// Get the Authorization header from the request
	const authHeader = req.headers.authorization;

	// Check if the header exists and is properly formatted
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res
			.status(401)
			.json({ message: "Authorization header missing or malformed" });
	}

	// Extract the token from the header
	const token = authHeader.split(" ")[1];

	try {
		// Verify the token and decode its payload
		const payload = jwt.verify(token, process.env.JWT_SECRET);

		// Find the user in the database by ID (from token payload)
		// Exclude the passwordHash field from the result
		const user = await User.findById(payload.sub).select("-passwordHash");

		// If user is not found, respond with 401
		if (!user) {
			return res.status(401).json({ message: "User not found" });
		}

		// Attach the user object to the request for downstream middleware/routes
		req.user = user;

		// Proceed to the next middleware or route handler
		next();
	} catch (err) {
		// If token verification fails, respond with 401 and error message
		return res
			.status(401)
			.json({ message: "Invalid or expired token", error: err.message });
	}
}
