import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Message from "./models/Message.js";
import Conversation from "./models/Conversation.js";

// Function to initialize the Socket.IO server
export function initSocket(server) {
	// Create a new Socket.IO server with CORS configuration
	const io = new Server(server, {
		cors: {
			origin: process.env.CLIENT_URL || "http://localhost:5173",
			credentials: true,
		},
	});

	/* ---------------- AUTH ---------------- */

	// Middleware for authenticating socket connections using JWT
	io.use((socket, next) => {
		try {
			// Retrieve token from handshake authentication data
			const token = socket.handshake.auth?.token;
			if (!token) return next(new Error("No token"));

			// Verify the token and extract user ID
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			socket.userId = decoded.sub;
			next();
		} catch (err) {
			// If verification fails, reject the connection
			next(new Error("Unauthorized"));
		}
	});

	/* ---------------- CONNECTION ---------------- */

	// Handle new socket connections
	io.on("connection", (socket) => {
		console.log("Socket connected:", socket.id);
		console.log("User:", socket.userId);

		// Join a personal room for the user (important for direct messaging)
		socket.join(socket.userId);

		// Join a conversation room
		socket.on("joinConversation", (conversationId) => {
			if (conversationId) socket.join(conversationId);
		});

		// Leave a conversation room
		socket.on("leaveConversation", (conversationId) => {
			if (conversationId) socket.leave(conversationId);
		});

		/* ---------------- SEND MESSAGE ---------------- */

		// Handle sending a new message
		socket.on("sendMessage", async ({ conversationId, text }) => {
			try {
				// Validate input
				if (!conversationId || !text?.trim()) return;

				// Find the conversation by ID
				const conversation = await Conversation.findById(conversationId);
				if (!conversation) return;

				// Create a new message document
				const message = await Message.create({
					conversation: conversationId,
					sender: socket.userId,
					text,
					readBy: [socket.userId],
				});

				// Update conversation with the last message and timestamp
				conversation.lastMessage = message._id;
				conversation.updatedAt = new Date();
				await conversation.save();

				// Prepare the payload to send to clients
				const payload = {
					chatId: conversationId,
					message,
					senderId: socket.userId,
				};

				// Emit the new message to all users in the conversation room
				io.to(conversationId).emit("newMessage", payload);

				// Emit the new message to each member's personal room
				for (const memberId of conversation.members) {
					io.to(String(memberId)).emit("newMessage", payload);
				}
			} catch (err) {
				// Log any errors that occur during message sending
				console.error("sendMessage error:", err);
			}
		});

		// Handle socket disconnection
		socket.on("disconnect", () => {
			console.log("Socket disconnected:", socket.id);
		});
	});

	// Return the Socket.IO server instance
	return io;
}
