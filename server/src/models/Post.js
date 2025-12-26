import mongoose from "mongoose";

const { Schema } = mongoose;

/**
 * Mongoose schema for a blog post.
 *
 * @typedef {Object} Post
 * @property {string} title - The title of the post (min 3, max 120 characters).
 * @property {string} slug - The unique slug for the post, used in URLs.
 * @property {string} content - The main content of the post (minimum 10 characters).
 * @property {string} [coverImage] - Optional URL or path to the cover image.
 * @property {'draft'|'published'|'archived'} [status='draft'] - The publication status of the post.
 * @property {import('mongoose').Types.ObjectId} author - Reference to the User who authored the post.
 * @property {Date} createdAt - Timestamp of when the post was created.
 * @property {Date} updatedAt - Timestamp of the last update to the post.
 */
const PostSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 120,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
		content: {
			type: String,
			required: true,
			minlength: 10,
		},
		coverImage: {
			type: String,
			default: "",
		},
		status: {
			type: String,
			enum: ["draft", "published", "archived"],
			default: "draft",
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

PostSchema.index({ author: 1, createdAt: -1 });

export default mongoose.model("Post", PostSchema);
