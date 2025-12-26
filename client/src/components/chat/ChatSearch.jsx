import { useEffect, useState } from "react";
import api from "../../services/axios";
import ChatUserItem from "./ChatUserItem";

export default function ChatSearch() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Reset users if query is too short
    if (query.trim().length < 2) {
      setUsers([]);
      return;
    }

    // Setup abort controller for request cancellation
    const controller = new AbortController();

    // Debounce the search input
    const t = setTimeout(async () => {
      try {
        const res = await api.get(
          `/users/search?q=${query}`,
          { signal: controller.signal }
        );
        setUsers(res.data);
      } catch {
        setUsers([]);
      }
    }, 300);

    return () => {
      clearTimeout(t);
      controller.abort();
    };
  }, [query]);

  return (
    <div className="border-b px-3 py-2">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cerca utenti…"
        className="w-full rounded-md bg-gray-100 px-3 py-1.5 text-sm focus:outline-none"
      />

      {users.length > 0 && (
        <div className="mt-2 space-y-1">
          {users.map((u) => (
            <ChatUserItem key={u._id} user={u} />
          ))}
        </div>
      )}
    </div>
  );
}
