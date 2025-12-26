import { v2 as cloudinary } from "cloudinary";

/**
 * Exports the configured Cloudinary instance for handling image and video uploads, transformations, and management.
 *
 * @module cloudinary
 * @see {@link https://cloudinary.com/documentation/node_integration|Cloudinary Node.js Documentation}
 * @type {import('cloudinary').Cloudinary}
 */

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
