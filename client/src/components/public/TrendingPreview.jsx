// data for demo purposes only
const trending = [
  "React 19",
  "TypeScript",
  "Web performance",
  "AI tools",
  "Clean code",
  "Next.js",
];

export default function TrendingPreview() {
  return (
    <section className="pb-24">
      <div className="container">
        <h2 className="mb-6 text-sm font-medium uppercase tracking-wide text-muted">
          Trending
        </h2>

        <div className="flex flex-wrap gap-3">
          {trending.map((topic) => (
            <span
              key={topic}
              className="
                rounded-full
                border
                px-4
                py-1.5
                text-sm
                text-muted
                transition
                hover:bg-black
                hover:text-white
              "
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
