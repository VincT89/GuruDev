import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPost,
  uploadPostCover,
  deletePost,
  getPostById,
} from "../../api/posts.api";

//Create new post
export const createNewPost = createAsyncThunk(
  "posts/create",
  async (data) => {
    const res = await createPost(data);
    return res.data;
  }
);

// Upload cover image
export const uploadCover = createAsyncThunk(
  "posts/uploadCover",
  async ({ postId, file }) => {
    const res = await uploadPostCover(postId, file);
    return {
      postId,
      coverImage: res.data.coverImage,
    };
  }
);

// Delete post
export const deleteExistingPost = createAsyncThunk(
  "posts/delete",
  async (id) => {
    await deletePost(id);
    return id;
  }
);

// Fetch post by ID
export const fetchPostById = createAsyncThunk(
  "posts/fetchOne",
  async (id, thunkAPI) => {
    try {
      const res = await getPostById(id);
      return res.data;
    } catch {
      return thunkAPI.rejectWithValue("Post non trovato");
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    list: [],
    current: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })

      // UPLOAD COVER
      .addCase(uploadCover.fulfilled, (state, action) => {
        const { postId, coverImage } = action.payload;

        const post = state.list.find((p) => p._id === postId); // find post in list
        if (post) post.coverImage = coverImage; // update cover image

        if (state.current?._id === postId) { // if current post is the one updated
          state.current.coverImage = coverImage; // update its cover image too
        }
      })

      // DELETE
      .addCase(deleteExistingPost.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (p) => p._id !== action.payload
        );

        if (state.current?._id === action.payload) {
          state.current = null;
        }
      })

      // FETCH ONE
      .addCase(fetchPostById.pending, (state) => {
        state.status = "loading";
        state.current = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.current = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchPostById.rejected, (state) => {
        state.status = "failed";
        state.current = null;
      });
  },
});

export default postsSlice.reducer;
