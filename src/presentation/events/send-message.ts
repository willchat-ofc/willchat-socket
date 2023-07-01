import type { Socket } from "socket.io";
import type { Event } from "../protocols/event";
import type { SendMessage } from "../../domain/usecase/send-message";
import { logger } from "../../utils/logger";

export class SendMessageEvent implements Event {
  public constructor(private readonly sendMessage: SendMessage) {}

  public async handle(socket: Socket, data: any): Promise<void> {
    try {
      await this.sendMessage.send({
        key: data.key,
        message: data.message,
        userId: data.userId,
        userName: data.userName,
      });

      socket.broadcast.to(data.key).emit("ReceiveMessages", [data]);
    } catch (err) {
      logger.fatal(err);
    }
  }
}
