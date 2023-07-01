import type { Socket } from "socket.io";
import type { Event } from "../protocols/event";
import type { ReceiveAllMessages } from "../../domain/usecase/receive-all-messages";
import { logger } from "../../utils/logger";
import { emitError } from "../helpers/error";

export class ReceiveAllMessagesEvent implements Event {
  public constructor(private readonly receiveAllMessage: ReceiveAllMessages) {}

  public async handle(socket: Socket, data: any): Promise<void> {
    try {
      const response = await this.receiveAllMessage.get({
        key: data.key,
      });

      socket.emit("ReceiveMessages", response);
    } catch (err) {
      logger.error(err, "ReceiveAllMessages Event");
      emitError(socket, err);
    }
  }
}
