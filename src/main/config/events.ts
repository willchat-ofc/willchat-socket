import type { Server, Socket } from "socket.io";
import { makeReceiveAllMessageEvent } from "../factory/receive-all-messages";
import { makeSendMessageEvent } from "../factory/send-message";

export const makeEvents = (server: Server) => {
  server.on("connection", async (socket: Socket) => {
    socket.on("ReceiveAllMessages", async (data: any) => {
      await makeReceiveAllMessageEvent().handle(socket, data);
    });

    socket.on("SendMessage", async (data: any) => {
      await makeSendMessageEvent().handle(socket, data);
    });
  });
};
