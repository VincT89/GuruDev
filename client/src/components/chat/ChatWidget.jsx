import { useEffect } from "react";
import { ChatCircleDotsIcon } from "@phosphor-icons/react";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
	fetchChats,
	openChat,
	closeChat,
} from "../../store/features/chatSlice";

import ChatSearch from "./ChatSearch";
import ChatConversationList from "./ChatConversationList";
import ChatWindow from "./ChatWindow";


// Widget of chat that can be toggled open/closed
export default function ChatWidget() {
	const dispatch = useAppDispatch();
	const { isOpen, activeChatId, unreadCount, chatsLoaded } = useAppSelector(
		(s) => s.chat
	);

	useEffect(() => {
		// Load chats when the widget is opened for the first time
		if (isOpen && !chatsLoaded) {
			dispatch(fetchChats());
		}
	}, [isOpen, chatsLoaded, dispatch]);

	// Handle toggle button click
	function handleToggle() {
		if (isOpen && activeChatId) {
			dispatch(openChat(null)); // back to conversation list
		} else if (isOpen) {
			dispatch(closeChat()); // close widget
		} else {
			dispatch(openChat(null)); // open widget to conversation list
		}
	}

	return (
		<div className="fixed bottom-6 right-6 z-50">
			{isOpen && (
				<div className="mb-3 flex h-130 w-90 flex-col overflow-hidden rounded-xl border bg-white shadow-xl">
					{!activeChatId ? (
						<>
							<div className="border-b px-4 py-3 font-medium">Messaggi</div>
							<ChatSearch />
							<ChatConversationList />
						</>
					) : (
						<ChatWindow />
					)}
				</div>
			)}

			<button
				onClick={handleToggle}
				className="relative flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-lg"
			>
				<ChatCircleDotsIcon size={26} weight="fill" />

				{/* DEBUG SEMPRE VISIBILE */}
				<span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-semibold text-white">
					{unreadCount}
				</span>
			</button>
		</div>
	);
}
