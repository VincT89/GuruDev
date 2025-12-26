// Import mongoose for MongoDB interaction
import mongoose from "mongoose";
// Import dotenv to load environment variables from .env file
import dotenv from "dotenv";
// Import slugify to generate URL-friendly slugs
import slugify from "slugify";

// Import User and Post models
import User from "../models/User.js";
import Post from "../models/Post.js";

// Load .env file securely (regardless of where node is launched)
dotenv.config({
	path: new URL("../../.env", import.meta.url),
});

// Security check: ensure MONGODB_URI is defined in .env
if (!process.env.MONGODB_URI) {
	throw new Error("MONGODB_URI not defined in .env");
}

// Main seeding function
async function seed() {
	try {
		// Connect to MongoDB
		console.log("Connecting to MongoDB...");
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("MongoDB connected");

		// Optional: clean up previous posts
		await Post.deleteMany({});
		console.log("Previous posts deleted");

		// Fetch all users
		const users = await User.find();
		if (!users.length) {
			throw new Error("No users found");
		}

		// Array to store posts to be inserted
		const posts = [];

		// For each user, create 4 posts
		for (const user of users) {
			for (let i = 1; i <= 4; i++) {
				const title = "Post " + i;

				posts.push({
					title,
					// Generate a unique slug for each post
					slug: slugify(`${title}-${user._id}-${i}`, {
						lower: true,
						strict: true,
					}),
					// Post content with user information and placeholder text
					content: `Questo è il contenuto del post ${i} scritto da ${user.username}.
          
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
					// Alternate cover images for posts
					coverImage:
						i % 2 === 0
							? "https://images.unsplash.com/photo-1522199710521-72d69614c702"
							: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
					status: "published",
					author: user._id,
				});
			}
		}

		// Insert all generated posts into the database
		await Post.insertMany(posts);

		// Log the result
		console.log(`Seeder completed: created ${posts.length} posts`);
	} catch (err) {
		// Log any errors that occur during seeding
		console.error("Error in post seeder:", err);
	} finally {
		// Disconnect from MongoDB
		await mongoose.disconnect();
		console.log("MongoDB connection closed");
	}
}

// Run the seeder
seed();

// Usage: node server/src/seeders/post.seeder.js
