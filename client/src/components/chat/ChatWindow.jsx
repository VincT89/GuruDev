import { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, XIcon } from "@phosphor-icons/react";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
	fetchMessages,
	closeChat,
	openChat,
} from "../../store/features/chatSlice";
import { useSocket } from "../../providers/SocketProvider";

import Avatar from "../ui/Avatar";

export default function ChatWindow() {
	// Redux & Socket
	const dispatch = useAppDispatch();
	const socket = useSocket();
	// State
	const { activeChatId, messages, chats } = useAppSelector((s) => s.chat);
	const { user } = useAppSelector((s) => s.auth);

	const chatMessages = messages[activeChatId] || [];
	const [text, setText] = useState("");
	const bottomRef = useRef(null);

	const activeChat = chats.find((c) => c._id === activeChatId);
	const otherUser = activeChat?.members.find((m) => m._id !== user._id);

	useEffect(() => {
		// Fetch messages when active chat changes
		if (!socket || !activeChatId) return;

		dispatch(fetchMessages(activeChatId));
		// Join the conversation room - with emit to server , so server knows which room to join
		socket.emit("joinConversation", activeChatId);

		return () => {
			socket.emit("leaveConversation", activeChatId);
		};
	}, [socket, activeChatId, dispatch]);

	useEffect(() => {
		// Scroll to bottom when messages change
		bottomRef.current?.scrollIntoView();
	}, [chatMessages.length]);

	function sendMessage(e) {
		e.preventDefault();
		if (!text.trim() || !socket) return;

		socket.emit("sendMessage", {
			conversationId: activeChatId,
			text,
		});

		setText("");
	}

	return (
		<div className="flex h-full flex-col">
			{/* HEADER */}
			<div className="flex items-center justify-between border-b px-4 py-3 text-sm">
				<div className="flex items-center gap-2">
					<button
						onClick={() => dispatch(openChat(null))}
						aria-label="Torna alla lista"
						className="rounded p-1 hover:bg-gray-100"
					>
						<ArrowLeftIcon size={18} />
					</button>

					{otherUser && (
						<>
							<Avatar
								src={otherUser.avatar}
								username={otherUser.username}
								size={28}
							/>
							<span className="font-medium">
								{otherUser.username.charAt(0).toUpperCase() +
									otherUser.username.slice(1)}
							</span>
						</>
					)}
				</div>

				<button
					onClick={() => dispatch(closeChat())}
					aria-label="Chiudi chat"
					className="rounded p-1 hover:bg-gray-100"
				>
					<XIcon size={18} />
				</button>
			</div>

			{/* MESSAGES */}
			<div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
				{chatMessages.map((m) => {
					const isMe = m.sender._id === user._id;

					return (
						<div
							key={m._id}
							className={`flex ${isMe ? "justify-end" : "justify-start"}`}
						>
							<div
								className={`max-w-[70%] rounded-xl px-3 py-2 text-sm ${
									isMe ? "bg-black text-white" : "bg-gray-100"
								}`}
							>
								{m.text}
							</div>
						</div>
					);
				})}
				<div ref={bottomRef} />
			</div>

			{/* INPUT */}
			<form onSubmit={sendMessage} className="border-t px-3 py-2">
				<input
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder={
						socket ? "Scrivi un messaggio..." : "Connessione in corso..."
					}
					disabled={!socket}
					className="w-full rounded-full border px-4 py-2 text-sm disabled:bg-gray-100"
				/>
			</form>
		</div>
	);
}
