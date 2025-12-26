import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toggleLike, getLikeCount } from "../../api/likes.api.js";

// Toggle like (backend truth)
export const togglePostLike = createAsyncThunk(
  "likes/toggle",
  async (postId) => {
    const res = await toggleLike(postId);
    return {
      postId,
      liked: res.data.liked,
    };
  }
);

// Fetch like count (optional)
export const fetchLikeCount = createAsyncThunk(
  "likes/count",
  async (postId) => {
    const res = await getLikeCount(postId);
    return {
      postId,
      count: res.data.count,
    };
  }
);

const likesSlice = createSlice({
  name: "likes",
  initialState: {
    byPost: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikeCount.fulfilled, (state, action) => {
        state.byPost[action.payload.postId] = action.payload.count;
      })
      .addCase(togglePostLike.fulfilled, (state, action) => {
        const { postId, liked } = action.payload;
        const current = state.byPost[postId] || 0;

        // Update like count based on whether it was liked or unliked
        state.byPost[postId] = liked
          ? current + 1
          : Math.max(current - 1, 0);
      });
  },
});

export default likesSlice.reducer;
