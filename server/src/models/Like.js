import mongoose from "mongoose";

const { Schema } = mongoose;

/**
 * Mongoose schema for the Like model.
 *
 * Represents a "like" made by a user on a post.
 *
 * @typedef {Object} Like
 * @property {ObjectId} user - Reference to the User who liked the post. Required.
 * @property {ObjectId} post - Reference to the Post that was liked. Required.
 * @property {Date} createdAt - Timestamp when the like was created.
 * @property {Date} updatedAt - Timestamp when the like was last updated.
 */
const likeSchema = new Schema(
	{
		user: {
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

// Ensure a user can like a post only once
likeSchema.index({ user: 1, post: 1 }, { unique: true });

export default mongoose.model("Like", likeSchema);
