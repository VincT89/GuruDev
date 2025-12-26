import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { receiveMessage } from "../store/features/chatSlice";

// create the context for the socket
const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  // get the auth token from the useAuth hook
  const { token } = useAuth();
  const dispatch = useAppDispatch();
  const [socket, setSocket] = useState(null);

// manage the socket connection based on the auth token
  useEffect(() => {
    if (!token) {
      setSocket(null);
      return;
    }

    // create the socket connection
    const s = io("http://localhost:5000", {
      auth: { token },
    });

    // handle socket events
    s.on("connect", () => {
      console.log("Socket connected:", s.id);
      setSocket(s);
    });

    s.on("disconnect", () => {
      console.log("Socket disconnected");
      setSocket(null);
    });

    // listen for new messages from the server, dispatching them to the Redux store
    s.on("newMessage", (payload) => {
      console.log("SOCKET newMessage", payload);
      dispatch(receiveMessage(payload));
    });

    return () => {
      s.off("newMessage");
      s.disconnect();
    };
  }, [token, dispatch]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
