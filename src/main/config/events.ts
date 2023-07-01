import type { Server, Socket } from "socket.io";
import { makeReceiveAllMessageEvent } from "../factory/receive-all-messages/receive-all-messages";
import { makeSendMessageEvent } from "../factory/send-message/send-message";
import { makeJoinGroupEvent } from "../factory/join-group/join-group";

export const makeEvents = (server: Server) => {
  server.on("connection", async (socket: Socket) => {
    socket.on("JoinGroup", async (data: any) => {
      await makeJoinGroupEvent().handle(socket, data);
    });

    socket.on("ReceiveAllMessages", async (data: any) => {
      await makeReceiveAllMessageEvent().handle(socket, data);
    });

    socket.on("SendMessage", async (data: any) => {
      await makeSendMessageEvent().handle(socket, data);
    });
  });
};
