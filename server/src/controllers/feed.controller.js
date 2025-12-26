import mongoose from "mongoose";
import { Post } from "../models/index.js";

// Controller function to get the user's feed
export async function getFeed(req, res, next) {
	try {
		// Convert the user's ID to a MongoDB ObjectId
		const userId = new mongoose.Types.ObjectId(req.user._id);

		// Pagination parameters: page number and limit per page
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 3;
		const skip = (page - 1) * limit;

		// Get the list of author IDs: users followed by the current user + the user themselves
		const authorIds = [...req.user.following, userId];

		// Aggregate posts from the database
		const posts = await Post.aggregate([
			{
				// Match posts by authors in the list and with status "published"
				$match: {
					author: { $in: authorIds },
					status: "published",
				},
			},
			// Sort posts by creation date (newest first)
			{ $sort: { createdAt: -1 } },
			// Skip posts for pagination
			{ $skip: skip },
			// Limit the number of posts returned (fetch one extra to check if there are more)
			{ $limit: limit + 1 },
			{
				// Lookup likes for each post
				$lookup: {
					from: "likes",
					localField: "_id",
					foreignField: "post",
					as: "likes",
				},
			},
			{
				// Add fields: coverImage, likesCount, and isLiked by the current user
				$addFields: {
					coverImage: "$coverImage",
					likesCount: { $size: "$likes" },
					isLiked: { $in: [userId, "$likes.user"] },
				},
			},
			{
				// Lookup author details for each post
				$lookup: {
					from: "users",
					localField: "author",
					foreignField: "_id",
					as: "author",
				},
			},
			// Unwind the author array to get a single author object
			{ $unwind: "$author" },
			// Exclude the likes array from the final output
			{ $project: { likes: 0 } },
		]);

		// Determine if there are more posts for pagination
		const hasMore = posts.length > limit;
		if (hasMore) posts.pop();

		// Send the response with posts, current page, and hasMore flag
		res.json({
			data: posts,
			page,
			hasMore,
		});
	} catch (err) {
		// Pass any errors to the error handler middleware
		next(err);
	}
}
