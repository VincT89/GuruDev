export default function Footer() {
  return (
    <footer className="footer">
      <div className="container py-5 flex flex-wrap items-center gap-4 text-sm text-muted">
        <span>© {new Date().getFullYear()} GuruDev</span>

        <nav className="flex gap-4">
          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
        </nav>
      </div>
    </footer>
  );
}
