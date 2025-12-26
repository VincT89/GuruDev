import Avatar from "../ui/Avatar";
import { timeAgo } from "../../utils/date";

export default function CommentItem({ comment }) {
  return (
    <div>
      <div className="card flex gap-4 p-4">
        <Avatar
          src={comment.author.avatar}
          username={comment.author.username}
          size={36}
        />

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {comment.author.username}
            </span>

            <span className="text-xs text-muted">
              · {timeAgo(comment.createdAt)}
            </span>
          </div>

          <p className="text-sm">
            {comment.content}
          </p>
        </div>
      </div>
    </div>
  );
}
