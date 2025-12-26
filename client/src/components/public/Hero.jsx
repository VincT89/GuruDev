import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="pt-28 pb-24">
      <div className="container">
        <h1 className="text-[42px] leading-tight tracking-tight">
          Dove le idee prendono forma.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted">
          Scrivi, leggi e segui contenuti di qualità da persone che hanno
          qualcosa da dire.
        </p>

        <div className="mt-10 flex items-center gap-6">
          <Link to="/register" className="btn btn-primary">
            Inizia a scrivere
          </Link>

          <Link
            to="/login"
            className="text-sm font-medium underline underline-offset-4"
          >
            Hai già un account?
          </Link>
        </div>
      </div>
    </section>
  );
}
