import api from "../services/axios";

// Fetches notifications
export function getNotifications() {
  return api.get("/notifications");
}

// Marks all notifications as read
export function markAllNotificationsRead() {
  return api.patch("/notifications/read");
}

// Marks a specific notification as read
export function markNotificationRead(id) {
  return api.patch(`/notifications/${id}/read`);
}
