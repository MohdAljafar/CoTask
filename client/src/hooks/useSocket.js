import { io } from "socket.io-client";

const socket = io("https://cotask.onrender.com");

export default socket;
