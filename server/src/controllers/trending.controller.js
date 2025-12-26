// Import the Trending model from the models directory
import Trending from "../models/Trending.js";

// Define an asynchronous function to get trending items
export async function getTrending(req, res, next) {
	try {
		// Fetch all trending items from the database and sort them by 'rank' in ascending order
		const trending = await Trending.find().sort({ rank: 1 });
		// Send the trending items as a JSON response
		res.json(trending);
	} catch (err) {
		// Pass any errors to the next middleware for error handling
		next(err);
	}
}
