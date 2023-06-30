import type { Socket } from "socket.io";
import type { Event } from "../protocols/event";
import type { ReceiveAllMessages } from "../../domain/usecase/receive-all-messages";

export class ReceiveAllMessagesEvent implements Event {
  public constructor(private readonly receiveAllMessage: ReceiveAllMessages) {}

  public async handle(socket: Socket, data: any): Promise<void> {
    const response = await this.receiveAllMessage.get({
      key: data.key,
    });

    console.log(socket);

    socket.emit("ReceiveMessages", response);
  }
}
