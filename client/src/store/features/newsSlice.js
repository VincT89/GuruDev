import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNews } from "../../api/news.api";

// Fetch news articles
export const fetchNews = createAsyncThunk(
  "news/fetch",
  async () => {
    const res = await getNews();
    return res.data;
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    list: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchNews.fulfilled, (s, a) => {
      s.list = a.payload;
      s.status = "succeeded";
    });
  },
});

export default newsSlice.reducer;
