import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchNews } from "../../store/features/newsSlice";

export default function NewsColumn() {
	const dispatch = useAppDispatch();
	const { list = [], status } = useAppSelector((s) => s.news || {});

	// Limit to 7 items
	const shortList = list.slice(0, 7);

	useEffect(() => {
		dispatch(fetchNews());
	}, [dispatch]);

	if (status === "loading") {
		return (
			<div className="rounded-xl border border-gray-200 bg-white p-4">
				<p className="text-sm text-gray-400">Caricamento news…</p>
			</div>
		);
	}

	if (!shortList.length) return null;

	return (
		<div className="rounded-xl border border-gray-200 bg-white">
			<h3 className="border-b px-4 py-3 text-sm font-semibold text-gray-900">
				Ultime news
			</h3>
			<div className="divide-y">
				{shortList.map((item) => (
					<article key={item._id} className="p-4 hover:bg-gray-50 transition">
						{item.mediaType === "image" ? (
							<img
								src={item.mediaUrl}
								alt={item.title}
								className="mb-3 h-32 w-full rounded-md object-cover"
							/>
						) : (
							<video
								src={item.mediaUrl}
								controls
								className="mb-3 h-32 w-full rounded-md object-cover"
							/>
						)}
						<h4 className="mb-1 text-sm font-medium text-gray-900">
							{item.title}
						</h4>
						<p className="mb-2 text-xs text-gray-600 line-clamp-3">
							{item.excerpt}
						</p>
						<span className="text-xs text-gray-400">{item.source}</span>
					</article>
				))}
			</div>
		</div>
	);
}
