import type {
  SendMessage,
  SendMessageInput,
} from "../../../src/domain/usecase/send-message";
import { SendMessageEvent } from "../../../src/presentation/events/send-message";
import { socketMock } from "../../mocks/socket";

const makeSendMessageStub = () => {
  class DbSendMessage implements SendMessage {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public send(data: SendMessageInput): Promise<void> {
      return;
    }
  }

  return new DbSendMessage();
};

const makeSut = () => {
  const sendMessage = makeSendMessageStub();
  const sut = new SendMessageEvent(sendMessage);

  return {
    sut,
    sendMessage,
  };
};

const fakeData = {
  key: "fake-key",
  message: "message",
  userId: "userId",
  userName: "userName",
};

describe("SendMessage Event", () => {
  test("should call socket.emit with correct values", async () => {
    const { sut } = makeSut();

    await sut.handle(socketMock, fakeData);

    expect(socketMock.broadcast.emit).toBeCalledWith("ReceiveMessages", [
      fakeData,
    ]);
  });

  test("should call sendMessages with correct values", async () => {
    const { sut, sendMessage } = makeSut();

    const sendSpy = jest.spyOn(sendMessage, "send");
    await sut.handle(socketMock, fakeData);

    expect(sendSpy).toBeCalledWith(fakeData);
  });
});
