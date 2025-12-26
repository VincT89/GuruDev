import { io } from "socket.io-client";

// Singleton socket instance
let socket = null;

export function connectSocket(token) {
  // Return existing socket if already connected
  if (socket) return socket;

  // Create a new socket connection
  socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000", {
    auth: { token },
    autoConnect: true,
  });

  return socket;
}

// Function to get the current socket instance
export function getSocket() {
  return socket;
}

// Function to disconnect the socket
export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
