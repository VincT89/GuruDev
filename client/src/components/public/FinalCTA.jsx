import { Link } from "react-router-dom";

export default function FinalCTA() {
  return (
    <section className="border-t">
      <div className="container py-24 text-center">
        <h2 className="text-3xl">
          Inizia a scrivere oggi.
        </h2>

        <p className="mt-4 text-muted max-w-xl mx-auto">
          È gratuito. Nessuna pressione. Solo idee che meritano di essere lette.
        </p>

        <div className="mt-10">
          <Link to="/register" className="btn btn-primary">
            Crea un account
          </Link>
        </div>
      </div>
    </section>
  );
}
