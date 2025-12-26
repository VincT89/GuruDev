import { useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";

import HomeToolbar from "../components/toolbar/HomeToolbar";
import Feed from "../components/layout/Feed";
import LeftAside from "../components/layout/LeftAside";
import RightAside from "../components/layout/RightAside";
import CreatePostModal from "../components/posts/CreatePostModal";

import { fetchFeed } from "../store/features/feedSlice";
import { createNewPost, uploadCover } from "../store/features/postsSlice";

import toast from "react-hot-toast";

export default function Home() {
	const dispatch = useAppDispatch();

	const [search, setSearch] = useState("");
	const [showCreatePost, setShowCreatePost] = useState(false);

	async function handleCreatePost({ title, content, image }) {
		if (!title?.trim() || !content?.trim()) {
			toast.error("Titolo e contenuto sono obbligatori");
			return;
		}

		try {
			const post = await dispatch(
				createNewPost({
					title: title.trim(),
					content: content.trim(),
					status: "published",
				})
			).unwrap();

			if (image) {
				const formData = new FormData();
				formData.append("cover", image);

				await dispatch(
					uploadCover({
						postId: post._id,
						file: formData,
					})
				).unwrap();
			}

			toast.success("Post pubblicato");
			dispatch(fetchFeed({ page: 1, limit: 3 }));
			setShowCreatePost(false);
		} catch (err) {
			console.error(err);
			toast.error("Errore nella creazione del post");
		}
	}

	return (
		<>
			{/* Toolbar (fixed) */}
			<HomeToolbar
				onCreatePost={() => setShowCreatePost(true)}
				onSearch={setSearch}
				notificationsCount={0}
			/>

			{/* Spacer per navbar (ANTI CLS) */}
			<div className="h-28" aria-hidden="true" />

			{/* Modal */}
			<CreatePostModal
				open={showCreatePost}
				onClose={() => setShowCreatePost(false)}
				onSubmit={handleCreatePost}
			/>

			{/* Layout */}
			<div className="mx-auto max-w-7xl px-4">
				<div className="grid gap-6 grid-cols-[56px_1fr_72px] md:grid-cols-[200px_1fr_260px] xl:grid-cols-[240px_1fr_300px]">
					<aside className="shrink-0">
						<LeftAside />
					</aside>

					<main className="min-w-0">
						<Feed search={search} />
					</main>

					<aside className="shrink-0">
						<RightAside />
					</aside>
				</div>
			</div>
		</>
	);
}
