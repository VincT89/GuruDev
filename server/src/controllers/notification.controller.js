import Notification from "../models/Notification.js";

/**
 * GET /api/notifications
 * Retrieves the latest 20 notifications for the authenticated user.
 */
export async function getNotifications(req, res, next) {
	try {
		// Find notifications where the recipient is the current user
		const notifications = await Notification.find({
			recipient: req.user._id,
		})
			// Populate sender field with username and avatar
			.populate("sender", "username avatar")
			// Populate post field with title
			.populate("post", "title")
			// Sort notifications by creation date (newest first)
			.sort({ createdAt: -1 })
			// Limit to 20 notifications
			.limit(20);

		// Send the notifications as JSON response
		res.json(notifications);
	} catch (err) {
		// Pass any errors to the error handler middleware
		next(err);
	}
}

/**
 * PATCH /api/notifications/read
 * Marks all unread notifications as read for the authenticated user.
 */
export async function markAllAsRead(req, res, next) {
	try {
		// Update all unread notifications for the user to set read: true
		await Notification.updateMany(
			{ recipient: req.user._id, read: false },
			{ read: true }
		);

		// Respond with a success message
		res.json({ success: true });
	} catch (err) {
		// Pass any errors to the error handler middleware
		next(err);
	}
}

/**
 * PATCH /api/notifications/:id/read
 * Marks a single notification as read for the authenticated user.
 */
export async function markOneAsRead(req, res, next) {
	try {
		// Find the notification by ID and recipient, and set read: true
		await Notification.findOneAndUpdate(
			{ _id: req.params.id, recipient: req.user._id },
			{ read: true }
		);

		// Respond with a success message
		res.json({ success: true });
	} catch (err) {
		// Pass any errors to the error handler middleware
		next(err);
	}
}
