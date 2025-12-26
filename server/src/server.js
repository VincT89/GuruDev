import "dotenv/config";
import http from "http";
import mongoose from "mongoose";
import app from "./app.js";
import { initSocket } from "./socket.js";

const PORT = process.env.PORT || 5000;

// Create HTTP server from Express app
const server = http.createServer(app);

// Init Socket.IO
initSocket(server);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log("Connected to MongoDB");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
