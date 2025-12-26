import mongoose from "mongoose";

const { Schema } = mongoose;

/**
 * Mongoose schema for News documents.
 *
 * @typedef {Object} News
 * @property {string} title - The title of the news item (max 120 characters, required).
 * @property {string} excerpt - A short summary or excerpt of the news (max 300 characters, required).
 * @property {"image"|"video"} mediaType - The type of media associated with the news (required).
 * @property {string} mediaUrl - The URL to the media resource (required).
 * @property {string} [source="DevBlog"] - The source of the news, defaults to "DevBlog".
 * @property {Date} [publishedAt=Date.now] - The publication date of the news, defaults to current date.
 * @property {Date} createdAt - Timestamp of when the document was created (automatically managed).
 * @property {Date} updatedAt - Timestamp of when the document was last updated (automatically managed).
 */
const NewsSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			maxlength: 120,
		},
		excerpt: {
			type: String,
			required: true,
			maxlength: 300,
		},
		mediaType: {
			type: String,
			enum: ["image", "video"],
			required: true,
		},
		mediaUrl: {
			type: String,
			required: true,
		},
		source: {
			type: String,
			default: "DevBlog",
		},
		publishedAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("News", NewsSchema);
