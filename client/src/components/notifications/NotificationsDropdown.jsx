import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
	fetchNotifications,
	readAllNotifications,
} from "../../store/features/notificationsSlice";

export default function NotificationsDropdown({ open }) {
	const dispatch = useAppDispatch();
	const { list, status } = useAppSelector((s) => s.notifications);

	// Fetch notifications and mark them as read when the dropdown is opened
	useEffect(() => {
		if (open) {
			dispatch(fetchNotifications());
			dispatch(readAllNotifications());
		}
	}, [open, dispatch]);

	if (!open) return null;

	return (
		<div className="absolute right-0 mt-2 w-80 rounded-xl border bg-white shadow-lg z-50">
			<div className="border-b px-4 py-3 text-sm font-medium">
				Notifiche
			</div>

			{status === "loading" && (
				<p className="px-4 py-3 text-sm text-gray-400">Caricamento…</p>
			)}

			{list.length === 0 && (
				<p className="px-4 py-6 text-sm text-gray-400">Nessuna notifica</p>
			)}

			<ul className="max-h-96 overflow-y-auto divide-y">
				{list.map((n) => (
					<li key={n._id} className="px-4 py-3 text-sm hover:bg-gray-50">
						<span className="font-medium">{n.sender.username}</span>{" "}
						{n.type === "like" && "ha messo like al tuo post"}
						{n.type === "comment" && "ha commentato il tuo post"}
						<div className="text-xs text-gray-400 mt-1">{n.post?.title}</div>
					</li>
				))}
			</ul>
		</div>
	);
}
