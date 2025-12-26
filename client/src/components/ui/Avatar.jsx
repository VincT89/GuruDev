export default function Avatar({
  // Props
  src,
  username = "",
  size = 32,
}) {
  const initial = username
    ? username.charAt(0).toUpperCase()
    : "•";

  const dimension = {
    width: size,
    height: size,
  };

  // Render image avatar if src is provided
  if (src) {
    return (
      <img
        src={src}
        alt={username || "avatar"}
        loading="lazy"
        decoding="async"
        style={dimension}
        className="rounded-full object-cover border border-gray-200"
      />
    );
  }

  return (
    <div
      style={dimension}
      className="flex items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-xs font-medium text-gray-700"
      aria-label={`Avatar di ${username}`}
    >
      {initial}
    </div>
  );
}
