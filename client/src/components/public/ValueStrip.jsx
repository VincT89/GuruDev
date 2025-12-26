export default function ValueStrip() {
  // data for demo purposes only
  const items = [
    "Scrittura semplice e pulita",
    "Feed costruito sulle persone che segui",
    "Niente rumore. Solo contenuti che contano",
  ];

  return (
    <section className="border-y">
      <div className="container py-14">
        <ul className="space-y-6">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-4 text-base"
            >
              <span className="mt-1 text-muted">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
