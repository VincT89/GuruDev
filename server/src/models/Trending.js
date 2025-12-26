import mongoose from "mongoose";

/**
 * Mongoose schema for the Trending model.
 *
 * Represents a trending item with the following fields:
 * @typedef {Object} Trending
 * @property {string} title - The title of the trending item. Required.
 * @property {string} excerpt - A short excerpt or summary. Required.
 * @property {string} imageUrl - URL to the image representing the trending item. Required.
 * @property {string} source - The source of the trending item. Required.
 * @property {string} link - The link to the original trending item. Required.
 * @property {number} rank - The rank of the trending item. Required and indexed.
 * @property {Date} createdAt - Timestamp of when the item was created. Automatically managed.
 * @property {Date} updatedAt - Timestamp of the last update. Automatically managed.
 */
const TrendingSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},

		excerpt: {
			type: String,
			required: true,
			trim: true,
		},

		imageUrl: {
			type: String,
			required: true,
		},

		source: {
			type: String,
			required: true,
		},

		link: {
			type: String,
			required: true,
		},

		rank: {
			type: Number,
			required: true,
			index: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Trending", TrendingSchema);
