import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import postsReducer from './features/postsSlice';
import commentsReducer from './features/commentsSlice';
import likesReducer from './features/likesSlice';
import usersReducer from './features/usersSlice';
import feedsReducer from './features/feedSlice';
import newsReducer from './features/newsSlice';
import trendingReducer from './features/trendingSlice';
import notificationsReducer from './features/notificationsSlice';
import chatReducer from './features/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
    likes: likesReducer,
    users: usersReducer,
    feed: feedsReducer,
    news: newsReducer,
    trending: trendingReducer,
    notifications: notificationsReducer,
    chat: chatReducer,
  },
})