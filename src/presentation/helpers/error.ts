import type { Socket } from "socket.io";

export const emitError = (socket: Socket, err: Error) => {
  socket.emit("Error", err.message);
};
