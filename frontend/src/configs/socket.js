import { io } from "socket.io-client";

export const socket = io("https://exam-proctor-o7pe.onrender.com", {
  withCredentials: true,
});
