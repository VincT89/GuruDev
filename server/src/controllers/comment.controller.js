import { Comment, Post } from "../models/index.js";
import { createCommentSchema } from "../validation/index.js";
import Notification from "../models/Notification.js";

/**
 * CREATE COMMENT
 * POST /api/posts/:postId/comments
 * Auth required
 */
export async function createComment(req, res, next) {
	try {
		// Validate request body
		const { value, error } = createCommentSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.message });
		}

		// Check if post exists and is published
		const post = await Post.findById(req.params.postId);
		if (!post || post.status !== "published") {
			return res.status(404).json({ message: "Post not found" });
		}

		// Create comment
		const comment = await Comment.create({
			content: value.content,
			author: req.user._id,
			post: post._id,
		});

		await comment.populate("author", "username avatar");

		if (post.author.toString() !== req.user._id.toString()) {
			// Create a notification for the post author
			await Notification.create({
				recipient: post.author,
				sender: req.user._id,
				type: "comment",
				post: post._id,
			});
		}

		return res.status(201).json(comment);
	} catch (err) {
		next(err);
		console.error(err);
	}
}

/**
 * GET COMMENTS FOR A POST
 * GET /api/posts/:postId/comments
 * Public
 */
export async function getCommentsByPost(req, res, next) {
	try {
		// Get comments for the specified post sorted by creation date and populate author info
		const comments = await Comment.find({ post: req.params.postId })
			.populate("author", "username avatar")
			.sort({ createdAt: 1 });

		return res.json(comments);
	} catch (err) {
		next(err);
		console.error(err);
	}
}

/**
 * DELETE COMMENT
 * DELETE /api/comments/:id
 * Author or post author
 */
export async function deleteComment(req, res, next) {
	try {
		// Find comment and populate post info
		const comment = await Comment.findById(req.params.id).populate("post");
		// Check if comment exists
		if (!comment) {
			return res.status(404).json({ message: "Comment not found" });
		}
		// Check if the requester is the comment author or the post author
		const isCommentAuthor =
			comment.author.toString() === req.user._id.toString();
		const isPostAuthor =
			comment.post.author.toString() === req.user._id.toString();

		// If not authorized, return forbidden
		if (!isCommentAuthor && !isPostAuthor) {
			return res.status(403).json({ message: "Forbidden" });
		}
		// Delete the comment
		await comment.deleteOne();

		return res.json({ message: "Comment deleted successfully" });
	} catch (err) {
		next(err);
		console.error(err);
	}
}
