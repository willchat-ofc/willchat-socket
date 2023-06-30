import { Socket } from "socket.io";
import { mock } from "ts-mockito";

const mockSocket: Socket = mock(Socket);

mockSocket.emit = jest.fn();

export { mockSocket };
