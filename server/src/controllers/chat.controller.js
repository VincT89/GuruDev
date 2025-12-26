import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

/**
 * GET MY CONVERSATIONS
 * GET /api/chat/conversations
 * Retrieves all conversations for the authenticated user.
 */
export async function getMyConversations(req, res, next) {
	try {
		// Find conversations where the user is a member
		const conversations = await Conversation.find({
			members: req.user._id,
		})
			// Populate members with username and avatar fields
			.populate("members", "username avatar")
			// Populate lastMessage and its sender's username
			.populate({
				path: "lastMessage",
				populate: { path: "sender", select: "username" },
			})
			// Sort by most recently updated
			.sort({ updatedAt: -1 });

		res.json(conversations);
	} catch (err) {
		next(err);
	}
}

/**
 * CREATE OR GET CONVERSATION
 * POST /api/chat/conversations
 * body: { userId }
 * Creates a new conversation with the specified user or returns the existing one.
 */
export async function createConversation(req, res, next) {
	try {
		const { userId } = req.body;

		// Validate userId (cannot be empty or the same as the current user)
		if (!userId || userId === req.user._id.toString()) {
			return res.status(400).json({ message: "Invalid user" });
		}

		// Check if a conversation already exists between the two users
		let convo = await Conversation.findOne({
			members: { $all: [req.user._id, userId] },
		});

		// If not, create a new conversation
		if (!convo) {
			convo = await Conversation.create({
				members: [req.user._id, userId],
			});
		}

		res.status(201).json(convo);
	} catch (err) {
		next(err);
	}
}

/**
 * GET MESSAGES
 * GET /api/chat/conversations/:id/messages
 * Retrieves all messages for a specific conversation.
 */
export async function getMessages(req, res, next) {
	try {
		// Find messages belonging to the conversation
		const messages = await Message.find({
			conversation: req.params.id,
		})
			// Populate sender with username and avatar
			.populate("sender", "username avatar")
			// Sort messages by creation time (ascending)
			.sort({ createdAt: 1 });

		res.json(messages);
	} catch (err) {
		next(err);
	}
}

/**
 * DELETE CONVERSATION
 * DELETE /api/chat/conversations/:id
 * Deletes a conversation and all its messages if the user is a member.
 */
export async function deleteConversation(req, res, next) {
	try {
		const { id } = req.params;
		const userId = req.user._id;

		// Find the conversation by ID
		const conversation = await Conversation.findById(id);
		if (!conversation) {
			return res.status(404).json({ message: "Conversation not found" });
		}

		// Security: Only members can delete the conversation
		const isMember = conversation.members.some(
			(m) => String(m) === String(userId)
		);
		if (!isMember) {
			return res.status(403).json({ message: "Not allowed" });
		}

		// Delete all messages in the conversation
		await Message.deleteMany({ conversation: id });

		// Delete the conversation itself
		await conversation.deleteOne();

		res.json({ success: true, chatId: id });
	} catch (err) {
		next(err);
	}
}
