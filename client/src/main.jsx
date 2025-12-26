// Import the createRoot function from React DOM for rendering the app
import { createRoot } from "react-dom/client";
// Import Provider to make the Redux store available to the app
import { Provider } from "react-redux";
// Import BrowserRouter for client-side routing
import { BrowserRouter } from "react-router-dom";
// Import Toaster for displaying toast notifications
import { Toaster } from "react-hot-toast";

// Import the Redux store
import { store } from "./store";
// Import the main App component
import App from "./App";
// Import global CSS styles
import "./index.css";

// Import the SocketProvider for WebSocket context
import { SocketProvider } from "./providers/SocketProvider";

// Render the React application into the DOM element with id "root"
createRoot(document.getElementById("root")).render(
	// Provide the Redux store to the app
	<Provider store={store}>
		{/* Enable routing throughout the app */}
		<BrowserRouter>
			{/* Provide WebSocket context to the app */}
			<SocketProvider>
				{/* Main application component */}
				<App />
			</SocketProvider>

			{/* Display toast notifications with custom styles */}
			<Toaster
				position="top-center"
				toastOptions={{
					style: {
						background: "#000",
						color: "#fff",
						fontSize: "14px",
					},
				}}
			/>
		</BrowserRouter>
	</Provider>
);
