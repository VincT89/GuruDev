import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchComments } from "../../store/features/commentsSlice";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";

// Using a constant empty array to avoid re-creating a new array on each render
const EMPTY_ARRAY = [];

export default function CommentsSection({ postId }) {
  const dispatch = useAppDispatch();

  const comments = useAppSelector(
    (s) => s.comments.byPost[postId] ?? EMPTY_ARRAY
  );

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [postId, dispatch]);

  return (
    <section>
      <div className="divider" />

      {comments.length === 0 && (
        <p className="text-sm text-muted mb-4">
          Nessun commento. Scrivi il primo.
        </p>
      )}

      <div className="space-y-4 mb-4">
        {comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))}
      </div>

      <div className="mt-2">
        <CommentInput postId={postId} />
      </div>
    </section>
  );
}
