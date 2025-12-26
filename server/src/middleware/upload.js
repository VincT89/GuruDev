// Import the multer library for handling multipart/form-data (file uploads)
import multer from "multer";

// Configure multer to store files in memory as Buffer objects
const storage = multer.memoryStorage();

// Define a file filter function to allow only image files
function fileFilter(req, file, cb) {
	// Check if the uploaded file's mimetype starts with "image/"
	if (!file.mimetype.startsWith("image/")) {
		// If not an image, reject the file with an error
		cb(new Error("Only images are allowed"), false);
	} else {
		// If an image, accept the file
		cb(null, true);
	}
}

// Export the configured multer instance with storage, file filter, and file size limit
export const upload = multer({
	storage, // Use memory storage
	fileFilter, // Use the custom file filter
	limits: {
		fileSize: 2 * 1024 * 1024, // Limit file size to 2MB
	},
});
