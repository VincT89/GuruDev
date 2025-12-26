import { useEffect, useState, useRef } from "react";
import { BellIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
	fetchNotifications,
	readAllNotifications,
	markAsRead,
} from "../../store/features/notificationsSlice";

export default function HomeToolbar({ onCreatePost, onSearch }) {
	// Redux
	const dispatch = useAppDispatch();
	const { list = [], unreadCount = 0 } = useAppSelector(
		(state) => state.notifications
	);

	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef(null);

	// search effect
	useEffect(() => {
		// Call onSearch callback if provided
		if (typeof onSearch === "function") {
			onSearch(query);
		}
	}, [query, onSearch]);

	function submitSearch(e) {
		e.preventDefault();
	}

	// Load notifications once
	useEffect(() => {
		dispatch(fetchNotifications());
	}, [dispatch]);

	// Close dropdown on outside click
	useEffect(() => {
		function handleClickOutside(e) {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Mark all as read function
	async function handleReadAll() {
		try {
			await dispatch(readAllNotifications()).unwrap();
		} catch (err) {
			console.error("Errore durante la lettura notifiche", err);
		}
	}

 // Toggle dropdown
	function handleToggleDropdown() {
		setOpen((prev) => {
			const willOpen = !prev;

			if (willOpen && unreadCount > 0) {
				handleReadAll();
			}

			return willOpen;
		});
	}

	return (
		<div className="fixed top-14 left-0 right-0 z-10 border-b border-gray-200 bg-white">
			<div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3">
				{/* Write post */}
				{typeof onCreatePost === "function" && (
					<button
						onClick={onCreatePost}
						className="rounded-full bg-black px-4 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
					>
						Scrivi
					</button>
				)}

				{/* Search */}
				<form onSubmit={submitSearch} className="flex-1">
					<input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Cerca nei post..."
						className="w-full rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-800 placeholder-gray-500 focus:outline-none"
					/>
				</form>

				{/* Notifications */}
				<div className="relative" ref={dropdownRef}>
					<button
						onClick={handleToggleDropdown}
						className="relative text-gray-700 hover:text-black"
					>
						<BellIcon size={26} weight="duotone" />

						{unreadCount > 0 && (
							<span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
								{unreadCount}
							</span>
						)}
					</button>

					{open && (
						<div className="absolute right-0 mt-3 w-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
							<div className="flex items-center justify-between border-b px-4 py-2 text-sm font-medium">
								Notifiche
								<button
									onClick={handleReadAll}
									className="text-xs text-gray-900 hover:text-black cursor-pointer"
								>
									Segna tutte come lette
								</button>
							</div>

							{list.length === 0 ? (
								<p className="px-4 py-6 text-sm text-gray-500">
									Nessuna notifica
								</p>
							) : (
								<ul className="max-h-96 overflow-y-auto">
									{list
										.filter((n) => n.post && n.sender)
										.map((n) => (
											<li
												key={n._id}
												className={`px-4 py-3 text-sm transition hover:bg-gray-50 ${
													!n.read ? "bg-gray-50" : ""
												}`}
											>
												<Link
													to={`/posts/${n.post._id}`}
													onClick={() => {
														dispatch(markAsRead(n._id));
														setOpen(false);
													}}
													className="block"
												>
													<span className="font-medium">
														{n.sender.username}
													</span>{" "}
													{n.type === "like"
														? "ha messo like al tuo post"
														: "ha commentato il tuo post"}
													<div className="mt-1 text-xs text-gray-400">
														{n.post.title}
													</div>
												</Link>
											</li>
										))}
								</ul>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
