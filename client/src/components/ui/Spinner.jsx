export default function Spinner({ size = 20 }) {
  return (
    <div className="flex justify-center py-8">
      <span
        aria-label="Caricamento"
        role="status"
        style={{ width: size, height: size }}
        className="
          animate-spin rounded-full
          border-2 border-gray-200 border-t-gray-900
          dark:border-gray-700 dark:border-t-gray-100
        "
      />
    </div>
  );
}
