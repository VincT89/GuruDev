import mongoose from "mongoose";

const { Schema } = mongoose;

/**
 * Comment Schema definition for MongoDB using Mongoose.
 *
 * This schema represents a comment made by a user on a post.
 *
 * Fields:
 * @typedef {Object} Comment
 * @property {string} content - The content of the comment. Required, trimmed, between 1 and 500 characters.
 * @property {mongoose.Types.ObjectId} author - Reference to the User who authored the comment. Required.
 * @property {mongoose.Types.ObjectId} post - Reference to the Post on which the comment was made. Required.
 * @property {Date} createdAt - Timestamp indicating when the comment was created. Automatically managed by Mongoose.
 * @property {Date} updatedAt - Timestamp indicating when the comment was last updated. Automatically managed by Mongoose.
 *
 * @module models/Comment
 */
const commentSchema = new Schema(
	{
		content: {
			type: String,
			required: true,
			trim: true,
			minlength: 1,
			maxlength: 500,
		},

		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		post: {
			type: Schema.Types.ObjectId,
			ref: "Post",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

// indice utile per recuperare commenti di un post
commentSchema.index({ post: 1, createdAt: 1 });

export default mongoose.model("Comment", commentSchema);
