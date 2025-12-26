import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import {
  fetchFeed,
  removePost,
  toggleLike,
} from "../../store/features/feedSlice";
import { togglePostLike } from "../../store/features/likesSlice";

import Spinner from "../ui/Spinner";
import Avatar from "../ui/Avatar";
import { timeAgo } from "../../utils/date";
import PostActions from "../posts/PostAction";
import CommentsSection from "../comments/CommentsSection";
import toast from "react-hot-toast";
import { deleteExistingPost } from "../../store/features/postsSlice";

export default function Feed({ search = "", authorId }) {
  const dispatch = useAppDispatch();
  const list = useAppSelector((s) => s.feed.list || []);
  const status = useAppSelector((s) => s.feed.status);
  const page = useAppSelector((s) => s.feed.page);
  const hasMore = useAppSelector((s) => s.feed.hasMore);
  const { user } = useAppSelector((s) => s.auth || {});
  const [openComments, setOpenComments] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  // Normalize search input
  const normalizedSearch = search.toLowerCase().trim();
 // Filter posts based on search input
  const filteredList = normalizedSearch
    ? list.filter(
      (post) =>
        // Check if title, content, or author's username includes the search term
          post.title.toLowerCase().includes(normalizedSearch) ||
          post.content.toLowerCase().includes(normalizedSearch) ||
          post.author.username.toLowerCase().includes(normalizedSearch)
      )
    : list;
  
  // Further filter by authorId if provided
  const finalList = authorId
    ? filteredList.filter((post) => post.author._id === authorId)
    : filteredList;

  useEffect(() => {
      dispatch(fetchFeed({ page: 1, limit: 3}));
  }, [dispatch]);

  function handleLike(postId) {
    dispatch(toggleLike(postId));
    dispatch(togglePostLike(postId));
  }

  // Toggle comments section for a specific post
  function toggleComments(postId) {
    setOpenComments((prev) => (prev === postId ? null : postId));
  }

  async function handleDelete(postId) {
    const ok = window.confirm("Vuoi eliminare questo post?");
    if (!ok) return;

    try {
      await dispatch(deleteExistingPost(postId)).unwrap();
      dispatch(removePost(postId));
      toast.success("Post eliminato");
    } catch {
      toast.error("Errore durante l'eliminazione");
    }
  }

  // Remove duplicate posts based on _id
  const uniqueFinalList = Array.from(
  new Map(finalList.map(p => [p._id, p])).values()
);

  return (
    <div className="mx-auto max-w-2xl space-y-8 py-4">
      {uniqueFinalList.map((post) => (
        <article
          key={post._id}
          className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
        >
          {/* Author */}
          <div className="flex items-center gap-2 px-4 pt-4 text-sm text-gray-500">
            <Avatar
              src={post.author.avatar}
              username={post.author.username}
              size={40}
            />
            <span className="font-medium text-gray-900">
              {post.author.username}
            </span>
            <span className="text-gray-400">·</span>
            <span>{timeAgo(post.createdAt)}</span>
          </div>

          {/* Cover image (CLS FIX) */}
          {post.coverImage && (
            <div className="mt-4 aspect-video w-full overflow-hidden bg-gray-100">
              <img
                src={post.coverImage}
                alt={post.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-5">
            <div className="mb-2 flex items-start justify-between gap-2">
              <h2 className="text-xl font-semibold hover:underline">
                <Link to={`/posts/${post._id}`}>{post.title}</Link>
              </h2>

              {user?._id === post.author._id && (
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenMenu((prev) =>
                        prev === post._id ? null : post._id
                      )
                    }
                    className="rounded-xl px-2 py-1 text-gray-400 hover:bg-gray-100"
                  >
                    ⋯
                  </button>

                  {openMenu === post._id && (
                    <div className="absolute right-0 z-10 mt-1 w-40 rounded-md border bg-white shadow-lg">
                      <button
                        onClick={() => {
                          setOpenMenu(null);
                          handleDelete(post._id);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
                      >
                        Elimina post
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <p className="mb-4 text-sm text-gray-700">
              {post.excerpt || post.content.slice(0, 200) + "..."}
            </p>

            <PostActions
              liked={post.isLiked}
              likesCount={post.likesCount}
              commentsCount={post.commentsCount}
              commentsOpen={openComments === post._id}
              onLike={() => handleLike(post._id)}
              onToggleComments={() => toggleComments(post._id)}
            />

            {openComments === post._id && (
              <CommentsSection postId={post._id} />
            )}
          </div>
        </article>
      ))}

      {status === "loading" && <Spinner />}

      {hasMore && status !== "loading" && (
        <button
          onClick={() => dispatch(fetchFeed({ page, limit: 3 }))}
          className="mx-auto block rounded-full border px-6 py-2 text-sm hover:bg-gray-100"
        >
          Mostra altri
        </button>
      )}

      {!hasMore && list.length > 0 && (
        <p className="text-center text-sm text-gray-400">Fine</p>
      )}
    </div>
  );
}
