import { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { openChat } from "../../store/features/chatSlice";
import { createConversation } from "../../api/chat.api";
import Avatar from "../ui/Avatar";

export default function ChatUserItem({ user }) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  // Handle click to create a new conversation
  async function handleClick() {
    if (loading) return;

    setLoading(true);
    try {
      const res = await createConversation(user._id);
      dispatch(openChat(res.data._id));
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="flex w-full items-center gap-2 rounded-md px-2 py-2 hover:bg-gray-100 disabled:opacity-50"
    >
      <Avatar
        src={user.avatar}
        username={user.username}
        size={32}
      />
      <span className="text-sm">{user.username}</span>
    </button>
  );
}
