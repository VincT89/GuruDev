import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import postRoutes from "./post.routes.js";
import commentRoutes from "./comment.routes.js";
import likeRoutes from "./like.routes.js";
import followRoutes from "./follow.routes.js";
import feedRoutes from "./feed.routes.js";
import newsRoutes from "./news.routes.js";
import trendingRoutes from "./trending.routes.js";
import notificationRoutes from "./notification.routes.js";
import chatRoutes from "./chat.routes.js";

/**
 * Express router instance used to define and handle application routes.
 * @type {import('express').Router}
 */
const router = Router();

// Mount authentication routes at /auth
router.use("/auth", authRoutes);

// Mount user-related routes at /users
router.use("/users", userRoutes);

// Mount post-related routes at /posts
router.use("/posts", postRoutes);

// Mount comment-related routes at /comments
router.use("/", commentRoutes);

// Mount like-related routes at /likes
router.use("/", likeRoutes);

// Mount follow-related routes at /follows
router.use("/", followRoutes);

// Mount feed-related routes at /feed
router.use("/", feedRoutes);

// Mount news-related routes at /news
router.use("/news", newsRoutes);

// Mount trending-related routes at /trending
router.use("/trending", trendingRoutes);

// Mount notification-related routes at /notifications
router.use("/notifications", notificationRoutes);

// Mount chat-related routes at /chats
router.use("/chats", chatRoutes);

export default router;
