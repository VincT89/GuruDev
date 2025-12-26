import cloudinary from "../config/cloudinary.js";
import { User } from "../models/User.js";
import { updateProfileSchema } from "../validation/index.js";

/**
 * GET ALL USERS (PUBLIC - LIGHT)
 * GET /api/users
 * Returns a list of all users with limited public fields.
 */
export async function getUsers(req, res, next) {
	try {
		// Find all users and select only specific fields
		const users = await User.find().select(
			"username avatar bio followers following"
		);

		// Send the users as JSON response
		res.json(users);
	} catch (err) {
		// Pass any errors to the error handler middleware
		next(err);
	}
}

/**
 * SEARCH USERS BY USERNAME
 * GET /api/users/search?q=
 * Searches users by username, excluding the current user.
 */
export async function searchUsers(req, res, next) {
	try {
		// Get the search query and trim whitespace
		const q = req.query.q?.trim();

		// If query is empty, return an empty array
		if (!q) {
			return res.json([]);
		}

		// Find users matching the query, excluding the current user
		const users = await User.find({
			username: { $regex: q, $options: "i" },
			_id: { $ne: req.user._id }, // exclude yourself
		})
			.select("username avatar")
			.limit(10);

		// Send the found users as JSON response
		res.json(users);
	} catch (err) {
		// Pass any errors to the error handler middleware
		next(err);
	}
}

/**
 * GET PUBLIC USER PROFILE
 * GET /api/users/:id
 * Returns the public profile of a user by ID.
 */
export async function getUserById(req, res, next) {
	try {
		// Find user by ID and select specific fields
		const user = await User.findById(req.params.id).select(
			"username avatar bio followers following"
		);

		// If user not found, return 404
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Send the user's public profile as JSON response
		res.json({
			_id: user._id,
			username: user.username,
			avatar: user.avatar,
			bio: user.bio,
			followersCount: user.followers.length,
			followingCount: user.following.length,
			followers: user.followers, // only IDs
			following: user.following, // only IDs
		});
	} catch (err) {
		// Pass any errors to the error handler middleware
		next(err);
	}
}

/**
 * UPDATE PROFILE (ME)
 * PATCH /api/users/me
 * Updates the authenticated user's profile.
 */
export async function updateProfile(req, res, next) {
	try {
		// Validate the request body using Joi schema
		const { value, error } = updateProfileSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.message });
		}

		// Prepare the update data
		const updateData = {};
		if (value.avatar !== undefined) updateData.avatar = value.avatar;
		if (value.bio !== undefined) updateData.bio = value.bio;

		// Update the user and return the new document
		const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
			new: true,
			runValidators: true,
		}).select("-passwordHash -__v");

		// If user not found, return 404
		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}

		// Send the updated user as JSON response
		res.json(updatedUser);
	} catch (err) {
		// Pass any errors to the error handler middleware
		next(err);
	}
}

/**
 * UPLOAD AVATAR (ME)
 * POST /api/users/me/avatar
 * Uploads and updates the authenticated user's avatar.
 */
export async function uploadAvatar(req, res, next) {
	try {
		// Check if a file was uploaded
		if (!req.file) {
			return res.status(400).json({ message: "No file uploaded" });
		}

		// Upload the file to Cloudinary
		const uploadStream = cloudinary.uploader.upload_stream(
			{
				folder: "avatars",
				public_id: req.user._id.toString(),
				overwrite: true,
				transformation: [{ width: 300, height: 300, crop: "fill" }],
			},
			async (error, result) => {
				if (error) return next(error);

				// Update the user's avatar URL in the database
				const updatedUser = await User.findByIdAndUpdate(
					req.user._id,
					{ avatar: result.secure_url },
					{ new: true }
				).select("-passwordHash -__v");

				// If user not found, return 404
				if (!updatedUser) {
					return res.status(404).json({ message: "User not found" });
				}

				// Send the updated user as JSON response
				res.json(updatedUser);
			}
		);

		// End the upload stream with the file buffer
		uploadStream.end(req.file.buffer);
	} catch (err) {
		// Pass any errors to the error handler middleware
		next(err);
	}
}
