import api from "../services/axios";

/**
 * Get all conversations for logged user
 * GET /api/chats/conversations
 */
export function getConversations() {
  return api.get("/chats/conversations");
}

/**
 * Get messages of a conversation
 * GET /api/chats/conversations/:id/messages
 */
export function getMessages(chatId) {
  return api.get(`/chats/conversations/${chatId}/messages`);
}

/**
 * Create or get a conversation
 * POST /api/chats/conversations
 */
export function createConversation(userId) {
  return api.post("/chats/conversations", { userId });
}

/**
 * Delete a conversation
 * DELETE /api/chats/conversations/:id
 */
export function deleteConversation(chatId) {
  return api.delete(`/chats/conversations/${chatId}`);
}
