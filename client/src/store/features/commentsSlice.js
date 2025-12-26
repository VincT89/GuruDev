import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	getComments,
	createComment,
	deleteComment,
} from "../../api/comments.api.js";

// Fetch comments for a post
export const fetchComments = createAsyncThunk(
	"comments/fetch",
	async (postId) => {
		const res = await getComments(postId);
		return { postId, comments: res.data };
	}
);

// Add new comment
export const addComment = createAsyncThunk(
	"comments/add",
	async ({ postId, content }) => {
		const res = await createComment(postId, { content });
		return { postId, comment: res.data };
	}
);

// Remove comment
export const removeComment = createAsyncThunk(
	"comments/remove",
	async ({ postId, commentId }) => {
		await deleteComment(commentId);
		return { postId, commentId };
	}
);

/**
 * Redux slice for managing comments state, organized by post.
 *
 * - `byPost`: An object mapping post IDs to arrays of comment objects.
 *
 * Handles the following async actions:
 * - `fetchComments.fulfilled`: Sets the comments array for a specific post.
 * - `addComment.fulfilled`: Adds a new comment to the array for a specific post.
 * - `removeComment.fulfilled`: Removes a comment by its ID from a specific post's comments array.
 *
 * @namespace commentsSlice
 * @property {Object} initialState - The initial state containing `byPost`.
 * @property {Object} reducers - No synchronous reducers are defined.
 * @property {Function} extraReducers - Handles fulfilled async actions for fetching, adding, and removing comments.
 */
const commentsSlice = createSlice({
	name: "comments",
	initialState: {
		byPost: {},
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchComments.fulfilled, (state, action) => {
				state.byPost[action.payload.postId] = action.payload.comments;
			})
			.addCase(addComment.fulfilled, (state, action) => {
				const { postId, comment } = action.payload;
				state.byPost[postId] = [...(state.byPost[postId] || []), comment];
			})
			.addCase(removeComment.fulfilled, (state, action) => {
				const { postId, commentId } = action.payload;
				state.byPost[postId] =
					state.byPost[postId]?.filter((c) => c._id !== commentId) || [];
			});
	},
});

export default commentsSlice.reducer;
