import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchPostById } from "../store/features/postsSlice";


export default function PostPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { current: post, status } = useAppSelector(
    (s) => s.posts
  );

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [id, dispatch]);

  if (status === "loading") {
    return <p className="p-6">Caricamento…</p>;
  }

  if (!post) {
    return <p className="p-6">Post non trovato</p>;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="mb-6 rounded-lg"
        />
      )}

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
