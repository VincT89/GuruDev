import axios from "axios";

/**
 * Axios instance
 * All HTTP requests go through this instance
 */
const api = axios.create({
	baseURL: "http://localhost:5000/api",
	headers: {
		"Content-Type": "application/json",
	},
});

/**
 * Request interceptor
 * Automatically adds the JWT token to the Authorization header
 */
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

export default api;
