// Import the News model from the models directory
import News from "../models/News.js";

// Define an asynchronous function to get news
export async function getNews(req, res, next) {
	try {
		// Fetch the latest 20 news items from the database, sorted by publishedAt in descending order
		const news = await News.find().sort({ publishedAt: -1 }).limit(20);

		// Send the fetched news as a JSON response
		res.json(news);
	} catch (err) {
		// Pass any errors to the next middleware for error handling
		next(err);
	}
}
