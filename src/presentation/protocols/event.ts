import type { Socket } from "socket.io";

export interface EventData {
  key: string;
  accessToken?: string;
}

export interface Event {
  handle: (socket: Socket, data: EventData) => Promise<void>;
}
