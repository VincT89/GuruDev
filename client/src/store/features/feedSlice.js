import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFeed } from "../../api/feed.api";

// Fetch feed posts with pagination
export const fetchFeed = createAsyncThunk(
	"feed/fetch",
	async ({ page = 1, limit = 3 }, { rejectWithValue }) => {
		try {
			const res = await getFeed(page, limit);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response?.data);
		}
	}
);

// Redux slice for managing feed state
const feedSlice = createSlice({
	name: "feed",
	initialState: {
		list: [], // List of feed posts
		page: 1, // Current page for pagination
		hasMore: true, // Flag indicating if more posts are available
		status: "idle", // Status of the fetch operation: 'idle' | 'loading' | 'succeeded' | 'failed'
	},
	reducers: {
		// Reset feed to initial state
		resetFeed(state) {
			state.list = [];
			state.page = 1;
			state.hasMore = true;
			state.status = "idle";
		},
		// Toggle like status for a post
		toggleLike(state, action) {
			const post = state.list.find((p) => p._id === action.payload);
			if (!post) return;
			post.isLiked = !post.isLiked; // Toggle the isLiked property
			post.likesCount += post.isLiked ? 1 : -1; // Update likes count accordingly
		},
		removePost(state, action) {
			state.list = state.list.filter((p) => p._id !== action.payload); // Remove post by ID
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFeed.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchFeed.fulfilled, (state, action) => {
				const { data, page, hasMore } = action.payload; // Destructure response payload

				const map = new Map();
				
				// add existing posts to map
				state.list.forEach((post) => {
					map.set(post._id, post);
				});

				// add / overwrite posts from fetched data
				data.forEach((post) => {
					map.set(post._id, post);
				});

				// update state list from map values to avoid duplicates
				state.list = Array.from(map.values());
				state.page = page + 1;
				state.hasMore = hasMore;
				state.status = "succeeded";
			});
	},
});

export const { resetFeed, toggleLike, removePost } = feedSlice.actions;
export default feedSlice.reducer;
