import mongoose from "mongoose";

/**
 * Mongoose schema for Conversation.
 *
 * Represents a conversation between users.
 *
 * @typedef {Object} Conversation
 * @property {mongoose.Types.ObjectId[]} members - Array of user ObjectIds participating in the conversation. Each member is required.
 * @property {mongoose.Types.ObjectId} [lastMessage] - ObjectId referencing the last message in the conversation.
 * @property {Date} createdAt - Timestamp of when the conversation was created.
 * @property {Date} updatedAt - Timestamp of the last update to the conversation.
 */
const conversationSchema = new mongoose.Schema(
	{
		members: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
		],

		lastMessage: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Message",
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);
