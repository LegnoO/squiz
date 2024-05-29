"use client";

import { io } from "socket.io-client";

export const socket = io("ws://localhost:3002", {
  path: "/socket.io",
  transports: ["websocket"],
  autoConnect: false,
  reconnection: false,
});
