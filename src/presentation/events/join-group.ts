import type { Socket } from "socket.io";
import type { Event } from "../protocols/event";

export class JoinGroupEvent implements Event {
  public async handle(socket: Socket, data: any): Promise<void> {
    try {
      socket.join(data.key);
    } catch (err) {
      socket.emit("Error", err);
    }
  }
}
