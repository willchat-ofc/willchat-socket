import type { Socket } from "socket.io";
import type { Event } from "../protocols/event";
import type { ReceiveAllMessages } from "../../domain/usecase/receive-all-messages";
import { logger } from "../../utils/logger";
import { emitError } from "../helpers/error";
import type { Validation } from "../protocols/validation";

export class ReceiveAllMessagesEvent implements Event {
  public constructor(
    private readonly receiveAllMessage: ReceiveAllMessages,
    public readonly validator: Validation
  ) {}

  public async handle(socket: Socket, data: any): Promise<void> {
    try {
      const error = this.validator.validate(data);
      if (error) return emitError(socket, error);

      const response = await this.receiveAllMessage.get({
        key: data.key,
        limit: data.limit,
        offset: data.offset,
      });

      socket.emit("ReceiveMessages", response);
    } catch (err) {
      logger.error(err, "ReceiveAllMessages Event");
      emitError(socket, err);
    }
  }
}
