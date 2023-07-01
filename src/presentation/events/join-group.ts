import type { Socket } from "socket.io";
import type { Event } from "../protocols/event";
import { logger } from "../../utils/logger";
import type { Validation } from "../protocols/validation";
import { emitError } from "../helpers/error";

export class JoinGroupEvent implements Event {
  public constructor(private readonly validator: Validation) {}

  public async handle(socket: Socket, data: any): Promise<void> {
    try {
      const error = this.validator.validate(data);
      if (error) {
        return emitError(socket, error);
      }

      socket.join(data.key);
    } catch (err) {
      logger.error(err, "JoinGroup Event");
      emitError(socket, err);
    }
  }
}
