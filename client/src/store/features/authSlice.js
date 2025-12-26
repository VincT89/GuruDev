import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, getMe } from "../../api/auth.api";
import { updateProfile, uploadAvatar } from "./usersSlice";

/**
 * Async thunk for user login.
 * Dispatches async login request and handles response or error.
 */
export const loginUser = createAsyncThunk(
	"auth/login",
	async (credentials, thunkAPI) => {
		try {
			const res = await login(credentials); // Call login API with credentials
			return res.data; // Return response data on success
		} catch (err) {
			// Return error message on failure
			return thunkAPI.rejectWithValue(
				err.response?.data?.message || "Login failed"
			);
		}
	}
);

/**
 * Async thunk for user registration.
 * Dispatches async register request and handles response or error.
 */
export const registerUser = createAsyncThunk(
	"auth/register",
	async (data, thunkAPI) => {
		try {
			const res = await register(data); // Call register API with user data
			return res.data; // Return response data on success
		} catch (err) {
			// Return error message on failure
			return thunkAPI.rejectWithValue(
				err.response?.data?.message || "Register failed"
			);
		}
	}
);

/**
 * Async thunk to fetch current authenticated user.
 * Dispatches async request and handles response or error.
 */
export const fetchMe = createAsyncThunk("auth/me", async (_, thunkAPI) => {
	try {
		const res = await getMe(); // Call API to get current user
		return res.data.user; // Return user data on success
	} catch (err) {
		// Return error message on failure
		return thunkAPI.rejectWithValue("Not authenticated");
	}
});

/**
 * Initial state for authentication slice.
 */
const initialState = {
	user: null, // Current user object
	token: localStorage.getItem("token"), // Auth token from localStorage
	status: "idle", // Status of async actions: idle | loading | succeeded | failed
	error: null, // Error message if any
};

/**
 * Authentication slice definition.
 * Handles login, register, fetchMe actions and logout reducer.
 */
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		// Reducer to log out the user
		logout(state) {
			state.user = null; // Clear user data
			state.token = null; // Clear token
			state.status = "idle"; // Reset status
			localStorage.removeItem("token"); // Remove token from localStorage
		},
	},
	extraReducers: (builder) => {
		builder

			// Handle login async thunk
			.addCase(loginUser.pending, (state) => {
				state.status = "loading"; // Set status to loading
				state.error = null; // Clear previous errors
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = "succeeded"; // Set status to succeeded
				state.user = action.payload.user; // Set user data
				state.token = action.payload.token; // Set token
				localStorage.setItem("token", action.payload.token); // Save token to localStorage
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = "failed"; // Set status to failed
				state.error = action.payload; // Set error message
			})

			// Handle register async thunk
			.addCase(registerUser.pending, (state) => {
				state.status = "loading"; // Set status to loading
				state.error = null; // Clear previous errors
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.status = "succeeded"; // Set status to succeeded
				state.user = action.payload.user; // Set user data
				state.token = action.payload.token; // Set token
				localStorage.setItem("token", action.payload.token); // Save token to localStorage
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.status = "failed"; // Set status to failed
				state.error = action.payload; // Set error message
			})

			// Handle fetchMe async thunk
			.addCase(fetchMe.pending, (state) => {
				state.status = "loading"; // Set status to loading
			})
			.addCase(fetchMe.fulfilled, (state, action) => {
				state.status = "succeeded"; // Set status to succeeded
				state.user = action.payload; // Set user data
			})
			.addCase(fetchMe.rejected, (state) => {
				state.status = "idle"; // Reset status to idle
				state.user = null; // Clear user data
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				if (state.user) {
					state.user = {
						...state.user,
						...action.payload,
					};
				}
			})
			.addCase(uploadAvatar.fulfilled, (state, action) => {
				if (state.user) {
					state.user.avatar = action.payload.avatar;
				}
			});
	},
});

// Export logout action
export const { logout } = authSlice.actions;
// Export reducer as default
export default authSlice.reducer;
