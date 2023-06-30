import type { Socket } from "socket.io";
import type { Event, EventData } from "../protocols/event";
import type { ReceiveAllMessages } from "../../domain/usecase/receive-all-messages";

export class ReceiveAllMessagesEvent implements Event {
  public constructor(private readonly receiveAllMessage: ReceiveAllMessages) {}

  public async handle(socket: Socket, data: EventData): Promise<void> {
    await this.receiveAllMessage.get({
      accessToken: data.accessToken,
      key: data.key,
    });

    socket.emit("ReceiveMessages", data);
  }
}
