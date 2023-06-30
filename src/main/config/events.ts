import { Server } from "socket.io";

export const makeEvents = (socket: Server) => {
  socket.on("connection", () => {});
};
