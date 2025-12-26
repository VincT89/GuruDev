// Import mongoose for MongoDB interactions
import mongoose from "mongoose";
// Import dotenv to load environment variables from .env file
import dotenv from "dotenv";
// Import path for handling file and directory paths
import path from "path";
// Import fileURLToPath to convert import.meta.url to a file path
import { fileURLToPath } from "url";
// Import the Trending Mongoose model
import Trending from "../models/Trending.js";

// Get the current file name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
// Get the directory name of the current file
const __dirname = path.dirname(__filename);

// Load environment variables from the .env file located two levels up
dotenv.config({
	path: path.resolve(__dirname, "../../.env"),
});

// Define an async function to seed the database
async function seed() {
	// Connect to MongoDB using the URI from environment variables
	await mongoose.connect(process.env.MONGODB_URI);

	// Remove all existing documents from the Trending collection
	await Trending.deleteMany();

	// Define an array of trending news/articles to seed
	const trending = [
		{
			rank: 1,
			title: "React 19 rivoluziona il rendering",
			excerpt: "Il nuovo engine di React 19 promette performance mai viste.",
			imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
			source: "React Blog",
			link: "https://react.dev",
		},
		{
			rank: 2,
			title: "AI Copilot cambia il modo di scrivere codice",
			excerpt: "Sempre più sviluppatori adottano strumenti AI nel workflow.",
			imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
			source: "TechCrunch",
			link: "https://techcrunch.com",
		},
		{
			rank: 3,
			title: "Next.js domina il frontend nel 2025",
			excerpt: "Framework completo, performante e amato dagli sviluppatori.",
			imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
			source: "Vercel",
			link: "https://vercel.com",
		},
		{
			rank: 4,
			title: "TypeScript diventa indispensabile",
			excerpt: "Sempre meno progetti JavaScript senza TypeScript.",
			imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
			source: "TypeScript Blog",
			link: "https://www.typescriptlang.org",
		},
		{
			rank: 5,
			title: "Web performance: le metriche che contano",
			excerpt: "INP sostituisce FID: Google aggiorna i Core Web Vitals.",
			imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
			source: "Google Web Dev",
			link: "https://web.dev",
		},
		{
			rank: 6,
			title: "Zustand vs Redux Toolkit",
			excerpt: "Confronto reale tra due approcci allo state management.",
			imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
			source: "LogRocket",
			link: "https://logrocket.com",
		},
		{
			rank: 7,
			title: "Server Components: quando usarli davvero",
			excerpt: "Potenti ma non sempre necessari: guida pratica.",
			imageUrl: "https://images.unsplash.com/photo-1605379399642-870262d3d051",
			source: "Smashing Magazine",
			link: "https://smashingmagazine.com",
		},
		{
			rank: 8,
			title: "CSS nel 2025: cosa è cambiato",
			excerpt: "Container queries e nuove API CSS.",
			imageUrl: "https://images.unsplash.com/photo-1505685296765-3a2736de412f",
			source: "CSS-Tricks",
			link: "https://css-tricks.com",
		},
		{
			rank: 9,
			title: "Node.js 22 migliora performance e stabilità",
			excerpt: "Nuova LTS con miglior gestione della memoria.",
			imageUrl: "https://images.unsplash.com/photo-1585079542156-2755d9c8a094",
			source: "Node.js Foundation",
			link: "https://nodejs.org",
		},
		{
			rank: 10,
			title: "GraphQL vs REST: il verdetto finale",
			excerpt: "Quando scegliere uno e quando l'altro.",
			imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
			source: "Apollo Blog",
			link: "https://apollographql.com",
		},
		{
			rank: 11,
			title: "Edge computing: il futuro del web",
			excerpt: "Latenze minime e UX migliori grazie all'edge.",
			imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
			source: "Cloudflare",
			link: "https://cloudflare.com",
		},
		{
			rank: 12,
			title: "Clean Code nel frontend moderno",
			excerpt: "Scrivere codice leggibile e manutenibile.",
			imageUrl: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
			source: "Medium",
			link: "https://medium.com",
		},
		{
			rank: 13,
			title: "Autenticazione JWT: errori comuni",
			excerpt: "Le trappole più frequenti in produzione.",
			imageUrl: "https://images.unsplash.com/photo-1556155092-490a1ba16284",
			source: "Auth0",
			link: "https://auth0.com",
		},
		{
			rank: 14,
			title: "Testing frontend: cosa testare davvero",
			excerpt: "Unit, integration o E2E? La risposta giusta.",
			imageUrl: "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6",
			source: "Testing Library",
			link: "https://testing-library.com",
		},
		{
			rank: 15,
			title: "Monorepo: vantaggi e svantaggi reali",
			excerpt: "Quando conviene davvero adottarlo.",
			imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
			source: "Nx",
			link: "https://nx.dev",
		},
		{
			rank: 16,
			title: "Carriera frontend nel 2025",
			excerpt: "Skill richieste e framework più usati.",
			imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
			source: "Dev.to",
			link: "https://dev.to",
		},
		{
			rank: 17,
			title: "Docker per frontend developer",
			excerpt: "Ambienti consistenti senza stress.",
			imageUrl: "https://images.unsplash.com/photo-1605379399642-870262d3d051",
			source: "Docker Blog",
			link: "https://docker.com",
		},
		{
			rank: 18,
			title: "Sicurezza web: OWASP Top 10",
			excerpt: "Le vulnerabilità più comuni spiegate.",
			imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
			source: "OWASP",
			link: "https://owasp.org",
		},
		{
			rank: 19,
			title: "AI e sviluppo web: opportunità e rischi",
			excerpt: "Come l’AI sta cambiando il lavoro dei dev.",
			imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
			source: "Wired",
			link: "https://wired.com",
		},
		{
			rank: 20,
			title: "Come strutturare un progetto React grande",
			excerpt: "Pattern e folder structure vincenti.",
			imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
			source: "Frontend Masters",
			link: "https://frontendmasters.com",
		},
	];

	// Insert the trending array into the Trending collection
	await Trending.insertMany(trending);

	// Log a success message to the console
	console.log("Trending seedati correttamente (20)");
	// Exit the process
	process.exit();
}

// Call the seed function to execute the seeding process
seed();

// Usage: node server/src/seeders/trending.seeder.js
