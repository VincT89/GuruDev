import { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addComment } from "../../store/features/commentsSlice";

export default function CommentInput({ postId }) {
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch(addComment({ postId, content: text }));
    setText("");
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-3">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Aggiungi un commento…"
        className="input flex-1 border-none p-0 focus:ring-0"
      />

      <button
        type="submit"
        disabled={!text.trim()}
        className="btn btn-primary text-sm"
      >
        Pubblica
      </button>
    </form>
  );
}
