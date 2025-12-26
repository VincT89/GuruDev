import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import News from "../models/News.js";

// Get the current file name and directory name (ESM compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the .env file located two levels up
dotenv.config({
	path: path.resolve(__dirname, "../../.env"),
});

async function seed() {
	// Connect to MongoDB using the URI from environment variables
	await mongoose.connect(process.env.MONGODB_URI);

	// Remove all existing News documents
	await News.deleteMany();

	// Array of news objects to seed the database
	const news = [
		{
			title: "React 19 rilasciato: tutte le novità principali",
			excerpt:
				"Il team React annuncia React 19: miglioramenti alle performance, nuovi hook e rendering più efficiente.",
			mediaType: "image",
			mediaUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
			source: "React Blog",
		},
		{
			title: "Next.js 15 introduce il routing semplificato",
			excerpt:
				"La nuova versione di Next.js punta tutto su DX e performance con un routing ancora più intuitivo.",
			mediaType: "image",
			mediaUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
			source: "Vercel",
		},
		{
			title: "AI e sviluppo web: cosa cambia davvero",
			excerpt:
				"Copilot, ChatGPT e LLM stanno trasformando il lavoro degli sviluppatori. Opportunità o rischio?",
			mediaType: "image",
			mediaUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
			source: "TechCrunch",
		},
		{
			title: "Cos'è un LLM e perché tutti ne parlano",
			excerpt:
				"Una guida semplice per capire cosa sono i Large Language Models e come funzionano.",
			mediaType: "video",
			mediaUrl: "https://www.youtube.com/embed/5sLYAQS9sWQ",
			source: "YouTube",
		},
		{
			title: "TypeScript 5.5: tipi più intelligenti",
			excerpt:
				"TypeScript continua a evolversi con un sistema di tipi sempre più potente e preciso.",
			mediaType: "image",
			mediaUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
			source: "TypeScript Blog",
		},
		{
			title: "Node.js 22 migliora la gestione della memoria",
			excerpt:
				"La nuova LTS di Node.js introduce miglioramenti significativi su performance e stabilità.",
			mediaType: "image",
			mediaUrl: "https://images.unsplash.com/photo-1585079542156-2755d9c8a094",
			source: "Node.js Foundation",
		},
		{
			title: "Server Components: quando usarli davvero",
			excerpt:
				"React Server Components promettono molto, ma non sono sempre la scelta giusta.",
			mediaType: "image",
			mediaUrl: "https://images.unsplash.com/photo-1605379399642-870262d3d051",
			source: "Smashing Magazine",
		},
		{
			title: "CSS nel 2025: cosa è cambiato",
			excerpt:
				"Container queries, cascade layers e nuove unità: il CSS moderno è più potente che mai.",
			mediaType: "image",
			mediaUrl: "https://images.unsplash.com/photo-1505685296765-3a2736de412f",
			source: "CSS-Tricks",
		},
		{
			title: "GraphQL vs REST: quale scegliere oggi?",
			excerpt:
				"Un confronto pratico tra GraphQL e REST basato su casi reali di produzione.",
			mediaType: "image",
			mediaUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
			source: "Apollo Blog",
		},
		{
			title: "Docker per frontend developer",
			excerpt:
				"Come usare Docker per migliorare workflow e consistenza degli ambienti di sviluppo.",
			mediaType: "image",
			mediaUrl: "https://images.unsplash.com/photo-1605379399642-870262d3d051",
			source: "Docker Blog",
		},
		{
			title: "Monorepo: vantaggi e svantaggi reali",
			excerpt:
				"Gestire più progetti in un solo repository: quando conviene e quando no.",
			mediaType: "image",
			mediaUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
			source: "Nx Blog",
		},
		{
			title: "Zustand vs Redux Toolkit",
			excerpt:
				"Due approcci diversi allo state management in React messi a confronto.",
			mediaType: "image",
			mediaUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
			source: "LogRocket",
		},
		{
			title: "Autenticazione JWT: errori comuni",
			excerpt:
				"I problemi più frequenti nell'uso dei JWT e come evitarli in produzione.",
			mediaType: "image",
			mediaUrl: "https://images.unsplash.com/photo-1556155092-490a1ba16284",
			source: "Auth0",
		},
		{
			title: "Clean Code nel frontend moderno",
			excerpt:
				"Best practice per scrivere codice frontend leggibile, manutenibile e scalabile.",
			mediaType: "image",
			mediaUrl: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
			source: "Medium",
		},
		{
			title: "Web performance: metriche che contano davvero",
			excerpt:
				"CLS, LCP e INP: come migliorare le performance percepite dagli utenti.",
			mediaType: "image",
			mediaUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
			source: "Google Web Dev",
		},
		{
			title: "Sicurezza web: OWASP Top 10 spiegato",
			excerpt:
				"Una panoramica aggiornata sulle vulnerabilità più comuni nelle applicazioni web.",
			mediaType: "image",
			mediaUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
			source: "OWASP",
		},
		{
			title: "Edge Computing: il futuro del web?",
			excerpt:
				"Eseguire codice vicino all'utente finale promette latenze minime e UX migliori.",
			mediaType: "image",
			mediaUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
			source: "Cloudflare",
		},
		{
			title: "Come strutturare un progetto React grande",
			excerpt:
				"Folder structure, naming e pattern per applicazioni React complesse.",
			mediaType: "image",
			mediaUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
			source: "Frontend Masters",
		},

		{
			title: "Carriera da frontend developer nel 2025",
			excerpt:
				"Skill richieste, framework più usati e come restare competitivi nel mercato.",
			mediaType: "image",
			mediaUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
			source: "Dev.to",
		},
	];

	// Insert the news array into the News collection
	await News.insertMany(news);

	// Log success message and exit the process
	console.log("News seedate correttamente");
	process.exit();
}

// Execute the seed function
seed();

// node server/src/seeders/news.seeder.js
