import mongoose from "mongoose";

/**
 * Mongoose schema for Notification documents.
 *
 * Represents a notification sent from one user to another regarding a post.
 *
 * @typedef {Object} Notification
 * @property {mongoose.Types.ObjectId} recipient - Reference to the User who receives the notification.
 * @property {mongoose.Types.ObjectId} sender - Reference to the User who triggered the notification.
 * @property {"like"|"comment"} type - Type of notification, either "like" or "comment".
 * @property {mongoose.Types.ObjectId} post - Reference to the related Post.
 * @property {boolean} [read=false] - Indicates if the notification has been read.
 * @property {Date} createdAt - Timestamp when the notification was created.
 * @property {Date} updatedAt - Timestamp when the notification was last updated.
 */
const notificationSchema = new mongoose.Schema(
	{
		recipient: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},

		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		type: {
			type: String,
			enum: ["like", "comment"],
			required: true,
		},

		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
			required: true,
		},

		read: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
