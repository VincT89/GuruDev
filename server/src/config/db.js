import mongoose from "mongoose";
// Database connection function
export async function connectDB() {
	try {
		mongoose.set("strictQuery", true); // To suppress deprecation warning
		await mongoose.connect(process.env.MONGODB_URI); // Connect to MongoDB using the connection string from environment variables
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		throw error;
	}
}
