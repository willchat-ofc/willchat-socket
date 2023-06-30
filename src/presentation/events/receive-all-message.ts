import type { Socket } from "socket.io";
import type { Event, EventData } from "../protocols/event";
import type { ReceiveAllMessages } from "../../domain/usecase/receive-all-messages";

export class ReceiveAllMessagesEvent implements Event {
  public constructor(private readonly receiveAllMessage: ReceiveAllMessages) {}

  public handle(socket: Socket, data: EventData): void {
    socket.emit("ReceiveAllMessages", data);
  }
}
