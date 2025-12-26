import Hero from "../components/public/Hero";
import PreviewPosts from "../components/public/PreviewPosts";
import TrendingPreview from "../components/public/TrendingPreview";
import ValueStrip from "../components/public/ValueStrip";
import FinalCTA from "../components/public/FinalCTA";

export default function PublicHome() {
	return (
		<main>
			{/* HERO */}
			<section className="bg-[#f5f5f4]">
				<Hero />
			</section>

			{/* CONTENUTI */}
			<section className="">
				<PreviewPosts />

				<TrendingPreview />
			</section>

			{/* VALORI */}
			<section className="bg-[#f9fafb]">
				<ValueStrip />
			</section>

			{/* CTA */}
			<section>
				<FinalCTA />
			</section>
		</main>
	);
}
