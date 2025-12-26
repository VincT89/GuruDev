import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchTrending } from "../../store/features/trendingSlice";

// Maximum number of trending items to display
const MAX_TRENDING = 14;

export default function TrendingList() {
  const dispatch = useAppDispatch();
  const { list = [], status } = useAppSelector((s) => s.trending || {});

  useEffect(() => {
    dispatch(fetchTrending());
  }, [dispatch]);

  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-900">
          Trending
        </h3>
      </div>

      {/* Scroll area */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {status === "loading" && (
          <p className="text-sm text-gray-400">Caricamento…</p>
        )}

        <ul className="space-y-3">
          {list.slice(0, MAX_TRENDING).map((n, i) => (
            <li
              key={n._id}
              className="group flex cursor-pointer items-start gap-3 rounded-lg p-2 transition hover:bg-gray-50"
            >
              {/* Rank */}
              <span className="w-5 shrink-0 text-xs font-bold text-gray-400 group-hover:text-black">
                {i + 1}
              </span>

              {/* Image */}
              <img
                src={n.imageUrl}
								alt={n.title}
								loading="lazy"
								decoding="async"
                className="h-12 w-12 shrink-0 rounded-lg object-cover"
              />

              {/* Content */}
              <div className="flex-1">
                <p className="line-clamp-2 text-sm font-medium leading-snug text-gray-900 group-hover:underline">
                  {n.title}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {n.source} ·{" "}
                  {new Date(n.createdAt).toLocaleDateString()}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {status === "succeeded" && list.length === 0 && (
          <p className="text-sm text-gray-400">
            Nessun contenuto trending
          </p>
        )}
      </div>
    </div>
  );
}
