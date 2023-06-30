import type { Server, Socket } from "socket.io";
import { makeReceiveAllMessageEvent } from "../factory/receive-all-messages";

export const makeEvents = (server: Server) => {
  server.on("connection", async (socket: Socket) => {
    socket.on("receiveAllMessages", async (data: any) => {
      await makeReceiveAllMessageEvent().handle(socket, data);
    });
  });
};
