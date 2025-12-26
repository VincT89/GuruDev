import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "../../api/notifications.api";

// Fetch notifications
export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  async (_, thunkAPI) => { // no args needed
    try {
      const res = await getNotifications();
      return res.data;
    } catch {
      return thunkAPI.rejectWithValue("Errore notifiche");
    }
  }
);

// Mark all notifications as read
export const readAllNotifications = createAsyncThunk(
  "notifications/readAll",
  async (_, thunkAPI) => {
    try {
      await markAllNotificationsRead();
      return true;
    } catch {
      return thunkAPI.rejectWithValue("Errore lettura notifiche");
    }
  }
);

// Mark single notification as read
export const markAsRead = createAsyncThunk(
  "notifications/readOne",
  async (id, thunkAPI) => {
    try {
      await markNotificationRead(id);
      return id;
    } catch {
      return thunkAPI.rejectWithValue("Errore lettura notifica");
    }
  }
);


const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    list: [],
    unreadCount: 0,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchNotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.list = action.payload;
        state.unreadCount = action.payload.filter( // count unread, not provided by backend
          (n) => !n.read
        ).length;
        state.status = "succeeded";
      })

      // READ ONE
      .addCase(markAsRead.fulfilled, (state, action) => {
        const id = action.payload;
        const notif = state.list.find((n) => n._id === id); // find notification
        if (notif && !notif.read) { // if found and unread
          notif.read = true; // mark as read
          state.unreadCount -= 1; // decrement unread count
        }
      })

      // READ ALL
      .addCase(readAllNotifications.fulfilled, (state) => {
        state.list.forEach((n) => { // mark all as read
          n.read = true; // mark as read
        });
        state.unreadCount = 0; // reset unread count
      });
  },
});

export default notificationsSlice.reducer;
