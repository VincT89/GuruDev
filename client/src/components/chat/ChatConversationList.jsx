import { XIcon, TrashIcon } from "@phosphor-icons/react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { openChat, deleteChat } from "../../store/features/chatSlice";
import Avatar from "../ui/Avatar";

// List of chat conversations
export default function ChatConversationList() {
	const dispatch = useAppDispatch();
	const chats = useAppSelector((s) => s.chat.chats);
	const { user } = useAppSelector((s) => s.auth);

	// If there are no chats, show a message
	if (!chats.length) {
		return (
			<p className="px-4 py-6 text-sm text-gray-500">Nessuna conversazione</p>
		);
	}

	// Handle chat deletion with confirmation
	function handleDelete(e, chatId) {
		e.stopPropagation();

		if (!confirm("Vuoi eliminare questa conversazione?")) return;
		dispatch(deleteChat(chatId));
	}

	return (
		// Container for the chat list, scrollable if needed
		<div className="flex-1 overflow-y-auto">
			{chats.map((chat) => {
				// Find the other member in the chat (not the current user)
				const other = chat.members.find((m) => m._id !== user._id);
				if (!other) return null;

				return (
					// Each chat conversation row
					<div
						key={chat._id}
						role="button"
						tabIndex={0}
						onClick={() => dispatch(openChat(chat._id))}
						onKeyDown={(e) => e.key === "Enter" && dispatch(openChat(chat._id))}
						className={`group relative flex w-full cursor-pointer items-center gap-3 px-4 py-3 hover:bg-gray-50 focus:outline-none ${
							chat.unreadCount ? "bg-gray-100" : ""
						}`}
					>
						{/* Avatar of the other user */}
						<Avatar src={other.avatar} username={other.username} size={38} />

						{/* Chat text and info */}
						<div className="flex-1 h-12 overflow-hidden">
							<div className="flex items-center gap-2 h-4">
								{/* Username, capitalized, bold if unread */}
								<p
									className={`text-sm ${
										chat.unreadCount ? "font-semibold" : "font-medium"
									}`}
								>
									{other.username.charAt(0).toUpperCase() +
										other.username.slice(1)}
								</p>

								{/* Unread message count badge */}
								{chat.unreadCount > 0 && (
									<span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 mt-2 text-[9px] font-semibold text-white">
										{chat.unreadCount}
									</span>
								)}
							</div>

							{/* Last message preview */}
							{chat.lastMessage && (
								<p className="truncate text-xs text-gray-500">
									{chat.lastMessage.text}
								</p>
							)}
						</div>

						{/* Action buttons (show on hover) */}
						<div className="absolute right-3 top-1/2 flex -translate-y-1/2 gap-2 opacity-0 transition-opacity group-hover:opacity-100">
							{/* Close chat button */}
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									dispatch(openChat(null));
								}}
								className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700"
								title="Chiudi"
							>
								<XIcon size={14} />
							</button>

							{/* Delete chat button */}
							<button
								type="button"
								onClick={(e) => handleDelete(e, chat._id)}
								className="rounded p-1 text-gray-400 hover:bg-red-100 hover:text-red-600"
								title="Elimina"
							>
								<TrashIcon size={14} />
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
}
