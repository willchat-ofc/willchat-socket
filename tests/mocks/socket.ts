/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Socket } from "socket.io";

export const socketMock: Socket = {
  emit: jest.fn(),
  join: jest.fn(),
  broadcast: {
    emit: jest.fn(),
    to: jest.fn(() => ({
      emit: jest.fn(),
    })),
  },
} as unknown as Socket;
