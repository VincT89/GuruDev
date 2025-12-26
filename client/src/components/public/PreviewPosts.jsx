// data for demo purposes only
const previewPosts = [
  {
    title: "React 19 e il futuro del rendering",
    excerpt:
      "Cosa cambia davvero con il nuovo motore e perché è una svolta concreta per le performance.",
    readingTime: "5 min di lettura",
  },
  {
    title: "Scrivere codice leggibile è un atto di rispetto",
    excerpt:
      "Clean code non è una moda, è comunicazione chiara tra esseri umani.",
    readingTime: "4 min di lettura",
  },
  {
    title: "AI nel workflow quotidiano",
    excerpt:
      "Come usare Copilot e LLM senza delegare il pensiero critico.",
    readingTime: "6 min di lettura",
  },
];

export default function PreviewPosts() {
  return (
    <section className="py-24">
      <div className="container">
        <h2 className="mb-12 text-sm font-medium uppercase tracking-wide text-muted">
          Dal nostro network
        </h2>

        <ul className="space-y-14">
          {previewPosts.map((post) => (
            <li key={post.title}>
              <h3 className="text-2xl leading-snug">
                {post.title}
              </h3>

              <p className="mt-3 max-w-2xl text-base text-muted">
                {post.excerpt}
              </p>

              <p className="mt-4 text-sm text-muted">
                {post.readingTime}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
