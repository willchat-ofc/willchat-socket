import type { Socket } from "socket.io";
import type { Event } from "../protocols/event";
import type { SendMessage } from "../../domain/usecase/send-message";
import { logger } from "../../utils/logger";
import { emitError } from "../helpers/error";
import type { Validation } from "../protocols/validation";

export class SendMessageEvent implements Event {
  public constructor(
    private readonly validator: Validation,
    private readonly sendMessage: SendMessage
  ) {}

  public async handle(socket: Socket, data: any): Promise<void> {
    try {
      const error = this.validator.validate(data);
      if (error) return emitError(socket, error);

      const response = await this.sendMessage.send({
        key: data.key,
        message: data.message,
        userId: data.userId,
        userName: data.userName,
      });

      socket.broadcast.to(data.key).emit("ReceiveMessages", [response]);
    } catch (err) {
      logger.error(err, "SendMessage Event");
      emitError(socket, err);
    }
  }
}
