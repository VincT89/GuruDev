// Import bcrypt for password hashing
import bcrypt from "bcrypt";
// Import jsonwebtoken for JWT handling
import jwt from "jsonwebtoken";

// Import User model
import { User } from "../models/index.js";
// Import validation schemas for registration and login
import { registerSchema, loginSchema } from "../validation/index.js";

/**
 * Helper function for generating JWT tokens.
 * @param {Object} userId - The user's unique identifier.
 * @returns {String} - The signed JWT token.
 */
function signToken(userId) {
	return jwt.sign(
		{ sub: userId }, // Payload with user ID as subject
		process.env.JWT_SECRET, // Secret key from environment variables
		{ expiresIn: process.env.JWT_EXPIRES_IN || "7d" } // Token expiration
	);
}

/**
 * Controller for user registration.
 * Validates input, hashes password, creates user, and returns JWT token.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export async function register(req, res, next) {
	try {
		// Validate request body using Joi schema
		const { value, error } = registerSchema.validate(req.body);
		if (error) {
			// Return validation error
			return res.status(400).json({ message: error.message });
		}

		const { username, email, password } = value;

		// Check if a user with the same email or username already exists
		const existingUser = await User.findOne({ $or: [{ email }, { username }] });

		if (existingUser) {
			// Return conflict if user exists
			return res.status(409).json({ message: "User already exists." });
		}

		// Hash the user's password
		const passwordHash = await bcrypt.hash(password, 10);

		// Create a new user instance
			const newUser = await User.create({
				username,
				email,
				passwordHash,
			});

		// Generate JWT token for the new user
		const token = signToken(newUser._id);

		// Return token and user info (excluding password)
		return res.status(201).json({
			token,
			user: {
				id: newUser._id,
				username: newUser.username,
				email: newUser.email,
			},
		});
	} catch (err) {
		// Pass error to error handler
		next(err);
		console.error(err);
	}
}

/**
 * Controller for user login.
 * Validates input, checks credentials, and returns JWT token.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export async function login(req, res, next) {
	try {
		// Validate request body using Joi schema
		const { value, error } = loginSchema.validate(req.body);
		if (error) {
			// Return validation error
			return res.status(400).json({ message: error.message });
		}
		const { email, password } = value;

		// Find user by email
		const user = await User.findOne({ email });
		if (!user) {
			// Return unauthorized if user not found
			return res.status(401).json({ message: "Invalid email or password." });
		}

		// Compare provided password with stored hash
		const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
		if (!isPasswordValid) {
			// Return unauthorized if password is invalid
			return res.status(401).json({ message: "Invalid email or password." });
		}

		// Generate JWT token for the user
		const token = signToken(user._id);

		// Return token and user info (excluding password)
		return res.status(200).json({
			token,
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (err) {
		// Pass error to error handler
		next(err);
		console.error(err);
	}
}

/**
 * Controller for user logout.
 * Since JWTs are stateless, logout is handled on the client side by discarding the token.
 * This endpoint is provided for completeness.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export function logout(res) {
	// Invalidate token on client side by discarding it
	return res.status(200).json({ message: "Logged out successfully." });
}

/**
 * Controller to get the authenticated user's profile.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export async function me(req, res) {
	return res.status(200).json({ user: req.user });
}
