import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axios";
import {
  searchUsers,
  getUserById,
  toggleFollow,
} from "../../api/users.api";

//Search users by name
export const searchUsersByName = createAsyncThunk(
  "users/search",
  async (query) => {
    const res = await searchUsers(query);
    return res.data;
  }
);

// Fetch user profile by ID
export const fetchUserProfile = createAsyncThunk(
  "users/profile",
  async (id) => {
    const res = await getUserById(id);
    return res.data;
  }
);

// Update user profile
export const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.patch("/users/me", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Update profile failed"
      );
    }
  }
);

// Upload user avatar
export const uploadAvatar = createAsyncThunk(
  "users/uploadAvatar",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/users/me/avatar", formData, { // API call to upload avatar
        headers: { "Content-Type": "multipart/form-data" }, // set proper headers
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Upload avatar failed"
      );
    }
  }
);

// Toggle follow/unfollow user
export const toggleFollowUser = createAsyncThunk(
  "users/toggleFollow",
  async (userId) => {
    const res = await toggleFollow(userId);
    return { userId, following: res.data.following };
  }
);



const usersSlice = createSlice({
  name: "users",
  initialState: {
    searchResults: [],
    profile: null,
  },
  reducers: {
    clearSearchResults(state) {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(searchUsersByName.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.avatar = action.payload.avatar;
        }
      })
      .addCase(toggleFollowUser.fulfilled, (state, action) => { // Update followers list and count
        if (!state.profile) return; // if no profile loaded, do nothing

        const { userId, following } = action.payload; // extract userId and following status

        if (following) { // if now following
          state.profile.followers.push(userId); // add to followers list
          state.profile.followersCount += 1; // increment followers count
        } else {
          state.profile.followers = state.profile.followers.filter( // remove from followers list
            (id) => id !== userId // filter out unfollowed user
          );
          state.profile.followersCount -= 1; // decrement followers count
        }
      });
  },
});

export const { clearSearchResults } = usersSlice.actions;
export default usersSlice.reducer;
