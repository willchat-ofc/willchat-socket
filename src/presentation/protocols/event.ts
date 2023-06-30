import type { Socket } from "socket.io";

export interface Event {
  handle: (socket: Socket, data: any) => Promise<void>;
}
