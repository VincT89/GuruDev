import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTrending } from "../../api/trending.api";

// Fetch trending items
export const fetchTrending = createAsyncThunk(
  "trending/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getTrending();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const trendingSlice = createSlice({
  name: "trending",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrending.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchTrending.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload || "Errore nel caricamento dei trending";
      });
  },
});

export default trendingSlice.reducer;
