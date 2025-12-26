// Import Like and Post models from the models directory
import { Like, Post } from "../models/index.js";
// Import Notification model
import Notification from "../models/Notification.js";

/**
 * TOGGLE LIKE
 * POST /api/posts/:postId/like
 * Auth required
 * This function toggles the like status for a post by the authenticated user.
 */
export async function toggleLike(req, res, next) {
	try {
		// Find the post by its ID from the request parameters
		const post = await Post.findById(req.params.postId);
		// Check if the post exists and is published
		if (!post || post.status !== "published") {
			return res.status(404).json({ message: "Post not found" });
		}
		// Check if a like by this user on this post already exists
		const existingLike = await Like.findOne({
			post: post._id,
			user: req.user._id,
		});

		// If the like exists, remove it (unlike)
		if (existingLike) {
			await existingLike.deleteOne();

			// Respond with liked: false
			return res.json({
				liked: false,
			});
		}

		// If the like does not exist, create it (like)
		if (!existingLike) {
			await Like.create({
				post: post._id,
				user: req.user._id,
			});

			// If the user liking is not the author, create a notification
			if (post.author.toString() !== req.user._id.toString()) {
				await Notification.create({
					recipient: post.author,
					sender: req.user._id,
					type: "like",
					post: post._id,
				});
			}
		}

		// Respond with liked: true
		return res.json({
			liked: true,
		});
	} catch (err) {
		// Pass any errors to the next middleware and log them
		next(err);
		console.error(err);
	}
}

/**
 * GET LIKE COUNT FOR A POST
 * GET /api/posts/:postId/likes
 * Public
 * This function returns the number of likes for a specific post.
 */
export async function getLikeCount(req, res, next) {
	try {
		// Count the number of Like documents for the specified post
		const count = await Like.countDocuments({
			post: req.params.postId,
		});

		// Respond with the like count
		return res.json({ count });
	} catch (err) {
		// Pass any errors to the next middleware and log them
		next(err);
		console.error(err);
	}
}
