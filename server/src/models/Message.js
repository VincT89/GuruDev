import mongoose from "mongoose";

/**
 * Mongoose schema for the Message model.
 *
 * Represents a message exchanged within a conversation.
 *
 * Fields:
 * @property {mongoose.Schema.Types.ObjectId} conversation - Reference to the Conversation this message belongs to. Required.
 * @property {mongoose.Schema.Types.ObjectId} sender - Reference to the User who sent the message. Required.
 * @property {String} text - The content of the message. Required, trimmed, max length 2000 characters.
 * @property {mongoose.Schema.Types.ObjectId[]} readBy - Array of User references who have read the message.
 *
 * Options:
 * @option {boolean} timestamps - Automatically adds createdAt and updatedAt fields.
 */
const messageSchema = new mongoose.Schema(
	{
		conversation: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Conversation",
			required: true,
			index: true,
		},

		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		text: {
			type: String,
			required: true,
			trim: true,
			maxlength: 2000,
		},

		readBy: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.model("Message", messageSchema);
