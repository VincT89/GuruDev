import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	getConversations,
	getMessages,
	deleteConversation,
} from "../../api/chat.api";

// Async thunk to fetch all chat conversations
export const fetchChats = createAsyncThunk("chat/fetchChats", async () => {
	const res = await getConversations();
	return res.data;
});

// Async thunk to fetch messages for a specific conversation
export const fetchMessages = createAsyncThunk(
	"chat/fetchMessages",
	async (chatId) => {
		const res = await getMessages(chatId);
		return { chatId, messages: res.data };
	}
);

// Async thunk to delete a specific chat conversation
export const deleteChat = createAsyncThunk(
	"chat/deleteChat",
	async (chatId) => {
		const res = await deleteConversation(chatId);
		return res.data.chatId;
	}
);

/* ---------------- HELPERS ---------------- */

// Ensures that a chat object has a default unreadCount property
function ensureChatDefaults(chat) {
	if (typeof chat.unreadCount !== "number") {
		chat.unreadCount = 0;
	}
	return chat;
}

// Moves a chat to the top of the chat list (e.g., after receiving a new message)
function moveChatToTop(state, chatId) {
	const index = state.chats.findIndex((c) => String(c._id) === String(chatId));
	if (index <= 0) return;

	const [chat] = state.chats.splice(index, 1);
	state.chats.unshift(chat);
}

/* ---------------- SLICE ---------------- */

// Redux slice for chat state management
const chatSlice = createSlice({
	name: "chat",
	initialState: {
		chats: [], // List of chat conversations
		messages: {}, // Messages grouped by chatId
		activeChatId: null, // Currently open chat
		isOpen: false, // Whether the chat window is open
		chatsLoaded: false, // Whether chats have been loaded
		unreadCount: 0, // Total unread messages
	},

	reducers: {
		/* ---------- OPEN / CLOSE ---------- */

		// Opens a chat and sets it as active
		openChat(state, action) {
			state.isOpen = true;
			state.activeChatId = action.payload;

			if (!action.payload) return;

			const chat = state.chats.find(
				(c) => String(c._id) === String(action.payload)
			);
			if (!chat) return;

			ensureChatDefaults(chat);

			// Decrease global unread count by the chat's unread messages
			state.unreadCount = Math.max(0, state.unreadCount - chat.unreadCount);
			chat.unreadCount = 0;

			// Move the opened chat to the top
			moveChatToTop(state, action.payload);
		},

		// Closes the chat window and clears the active chat
		closeChat(state) {
			state.isOpen = false;
			state.activeChatId = null;
		},

		/* ---------- SOCKET MESSAGE ---------- */

		// Handles receiving a new message (e.g., via WebSocket)
		receiveMessage(state, action) {
			const { chatId, message } = action.payload;

			if (!state.messages[chatId]) {
				state.messages[chatId] = [];
			}

			// Prevent duplicate messages (important)
			const exists = state.messages[chatId].some(
				(m) => String(m._id) === String(message._id)
			);
			if (exists) return;

			state.messages[chatId].push(message);

			const isActiveChat = String(state.activeChatId) === String(chatId);

			const chat = state.chats.find((c) => String(c._id) === String(chatId));

			if (!chat) {
				// If chat is not in the list, increment global unread count if not active
				if (!isActiveChat) state.unreadCount += 1;
				return;
			}

			ensureChatDefaults(chat);
			chat.lastMessage = message;
			moveChatToTop(state, chatId);

			if (!isActiveChat) {
				chat.unreadCount += 1;
				state.unreadCount += 1;
			}
		},

		// Resets the entire chat state (e.g., on logout)
		resetChatState() {
			return {
				chats: [],
				messages: {},
				activeChatId: null,
				isOpen: false,
				chatsLoaded: false,
				unreadCount: 0,
			};
		},
	},

	extraReducers: (builder) => {
		builder
			// Handles successful fetch of chats
			.addCase(fetchChats.fulfilled, (state, action) => {
				state.chats = (action.payload || []).map(ensureChatDefaults);
				state.chatsLoaded = true;
			})
			// Handles failed fetch of chats
			.addCase(fetchChats.rejected, (state) => {
				state.chatsLoaded = false;
			})
			// Handles successful fetch of messages for a chat
			.addCase(fetchMessages.fulfilled, (state, action) => {
				const { chatId, messages } = action.payload;
				state.messages[chatId] = messages;

				const chat = state.chats.find((c) => String(c._id) === String(chatId));
				if (!chat) return;

				// If the chat is active, reset its unread count
				if (String(state.activeChatId) === String(chatId)) {
					ensureChatDefaults(chat);
					state.unreadCount = Math.max(0, state.unreadCount - chat.unreadCount);
					chat.unreadCount = 0;
				}
			})
			// Handles successful deletion of a chat
			.addCase(deleteChat.fulfilled, (state, action) => {
				const chatId = action.payload;

				const chat = state.chats.find((c) => String(c._id) === String(chatId));
				if (chat) {
					state.unreadCount = Math.max(
						0,
						state.unreadCount - (chat.unreadCount || 0)
					);
				}

				// Remove chat and its messages from state
				state.chats = state.chats.filter(
					(c) => String(c._id) !== String(chatId)
				);
				delete state.messages[chatId];

				// If the deleted chat was active, clear activeChatId
				if (String(state.activeChatId) === String(chatId)) {
					state.activeChatId = null;
				}
			});
	},
});

// Export actions for use in components
export const { openChat, closeChat, receiveMessage, resetChatState } =
	chatSlice.actions;

// Export reducer for store configuration
export default chatSlice.reducer;
