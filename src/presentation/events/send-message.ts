import type { Socket } from "socket.io";
import type { Event } from "../protocols/event";
import type { SendMessage } from "../../domain/usecase/send-message";

export class SendMessageEvent implements Event {
  public constructor(private readonly sendMessage: SendMessage) {}

  public async handle(socket: Socket, data: any): Promise<void> {
    await this.sendMessage.send({
      key: data.key,
      message: data.message,
      userId: data.userId,
      userName: data.userName,
    });

    console.log(socket.broadcast);

    socket.broadcast.emit("ReceiveMessages", data);
  }
}
