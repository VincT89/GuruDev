/**
 * 404 handler
 * This middleware handles requests to routes that do not exist.
 * It sends a 404 status code with a JSON message.
 */
export function notFound(req, res) {
	res.status(404).json({ message: "Route not found" });
}

/**
 * Global error handler
 * This middleware catches all errors thrown in the application.
 * It logs the error and sends a 500 status code with a generic error message.
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
	console.error(err);

	res.status(500).json({
		message: "Internal server error",
	});
}
