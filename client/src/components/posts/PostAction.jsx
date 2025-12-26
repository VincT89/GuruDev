import { ThumbsUpIcon } from "@phosphor-icons/react";

// Action button component
function ActionButton({ onClick, children, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="text-sm text-muted hover:underline disabled:opacity-40 cursor-pointer"
    >
      {children}
    </button>
  );
}

// Post actions component
export default function PostActions({
  liked,
  likesCount = 0,
  commentsCount = 0,
  commentsOpen,
  onLike,
  onToggleComments,
}) {
  return (
    <div className="mt-4 flex items-center gap-6 text-sm">
      {/* Like */}
      <ActionButton onClick={onLike}>
        <span className="flex items-center gap-1">
          <ThumbsUpIcon
            size={18}
            weight={liked ? "fill" : "regular"}
          />
          <span>
            {likesCount > 0 ? likesCount : "Mi piace"}
          </span>
        </span>
      </ActionButton>

      {/* Comments */}
      <ActionButton onClick={onToggleComments}>
        {commentsOpen
          ? "Nascondi commenti"
          : commentsCount > 0
          ? `Commenti (${commentsCount})`
          : "Commenta"}
      </ActionButton>
    </div>
  );
}
