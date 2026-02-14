import { io } from "socket.io-client";
import { mockSocket } from "./mockSocket";

const isDemo = import.meta.env.MODE === "demo";

export const socket = isDemo ? mockSocket : io("", { path: "/api/socket.io", autoConnect: true });
