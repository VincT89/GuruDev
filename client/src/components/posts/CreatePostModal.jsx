import { FileImageIcon } from "@phosphor-icons/react";
import { useState } from "react";

export default function CreatePostModal({ open, onClose, onSubmit }) {
	// State variables
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null);

	if (!open) return null;

	// Handlers
	function handleImage(e) {
		const file = e.target.files[0];
		if (!file) return;

		// Preview image
		setImage(file);
		setPreview(URL.createObjectURL(file));
	}

	function submit(e) {
		e.preventDefault();
		if (!title.trim() || !content.trim()) return;

		onSubmit({
			title: title.trim(),
			content: content.trim(),
			image, 
		});

		setTitle("");
		setContent("");
		setImage(null);
		setPreview(null);
		onClose();
	}

	return (
		<div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-6">
			<div className="w-full max-w-2xl rounded-lg bg-white shadow-lg">
				{/* Header */}
				<div className="flex items-center justify-between border-b px-6 py-4">
					<h2 className="text-lg font-medium text-gray-900">Scrivi un post</h2>

					<button
						onClick={onClose}
						className="text-sm text-gray-500 hover:text-black"
					>
						Annulla
					</button>
				</div>

				{/* Body */}
				<form onSubmit={submit} className="px-6 py-6">
					{/* Cover image */}
					{!preview ? (
						<label className="mb-4 flex cursor-pointer items-center gap-2 text-sm text-gray-500 hover:text-black">
							<span><FileImageIcon size={22} weight="duotone" /></span>
							<span>Aggiungi un'immagine</span>
							<input
								type="file"
								accept="image/*"
								onChange={handleImage}
								className="hidden"
							/>
						</label>
					) : (
						<div className="relative mb-4">
							<img
								src={preview}
								alt="Preview"
								className="max-h-64 w-full rounded-md object-cover"
							/>
							<button
								type="button"
								onClick={() => {
									setImage(null);
									setPreview(null);
								}}
								className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white"
							>
								Rimuovi
							</button>
						</div>
					)}

					{/* Title */}
					<input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Titolo"
						className="mb-4 w-full border-none text-2xl font-semibold placeholder-gray-400 focus:outline-none"
					/>

					{/* Content */}
					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder="Racconta la tua storia..."
						rows={10}
						className="w-full resize-none border-none text-base leading-relaxed placeholder-gray-400 focus:outline-none"
					/>

					{/* Footer */}
					<div className="mt-6 flex justify-end gap-3">
						<button
							type="button"
							onClick={onClose}
							className="text-sm text-gray-600 hover:text-black"
						>
							Annulla
						</button>

						<button
							type="submit"
							disabled={!title.trim() || !content.trim()}
							className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white disabled:opacity-40 hover:bg-gray-800"
						>
							Pubblica
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
