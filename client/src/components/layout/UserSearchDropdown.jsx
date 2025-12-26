import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
	searchUsersByName,
	clearSearchResults,
} from "../../store/features/usersSlice";

export default function UserSearchDropdown() {
	const dispatch = useAppDispatch();
	const dropdownRef = useRef(null);

	const users = useAppSelector((s) => s.users.searchResults || []);

	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");

	// search users when query changes
	useEffect(() => {
		if (query.trim().length > 1) {
			dispatch(searchUsersByName(query));
		} else {
			dispatch(clearSearchResults());
		}
	}, [query, dispatch]);

	// close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(e) {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setOpen(false);
				setQuery("");
				dispatch(clearSearchResults());
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [dispatch]);

	/* ---------------- RENDER ---------------- */

	return (
		<div className="relative" ref={dropdownRef}>
			{/* ICON */}
			<button
				onClick={() => setOpen((v) => !v)}
				className="text-gray-700 hover:text-black mt-2"
			>
				<MagnifyingGlassIcon size={20} />
			</button>

			{open && (
				<div className="absolute right-0 mt-3 w-72 rounded-xl border bg-white shadow-lg">
					{/* INPUT */}
					<div className="border-b px-3 py-2">
						<input
							autoFocus
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Cerca utenti…"
							className="w-full rounded-md bg-gray-100 px-3 py-1.5 text-sm focus:outline-none"
						/>
					</div>

					{/* RESULTS */}
					{users.length === 0 ? (
						<p className="px-4 py-3 text-sm text-gray-500">Nessun risultato</p>
					) : (
						<ul className="max-h-80 overflow-y-auto">
							{users.map((u) => (
								<li key={u._id}>
									<Link
										to={`/profile/${u._id}`}
										onClick={() => {
											setOpen(false);
											setQuery("");
											dispatch(clearSearchResults());
										}}
										className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50"
									>
										<img
											src={u.avatar || "/avatar-placeholder.png"}
											alt={u.username}
											className="h-8 w-8 rounded-full object-cover"
										/>
										<span className="font-medium">{u.username}</span>
									</Link>
								</li>
							))}
						</ul>
					)}
				</div>
			)}
		</div>
	);
}
