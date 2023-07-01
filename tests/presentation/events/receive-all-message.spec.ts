import type {
  ReceiveAllMessages,
  ReceiveAllMessagesInput,
} from "../../../src/domain/usecase/receive-all-messages";
import { ReceiveAllMessagesEvent } from "../../../src/presentation/events/receive-all-message";
import { socketMock } from "../../mocks/socket";

const makeDbReceiveAllMessageStub = (): ReceiveAllMessages => {
  class DbReceiveAllMessages implements ReceiveAllMessages {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async get(data: ReceiveAllMessagesInput): Promise<Array<any>> {
      return [
        {
          id: "fake-id",
          message: "fake-message",
          userId: "fake-user-id",
          userName: "fake-user-name",
        },
      ];
    }
  }

  return new DbReceiveAllMessages();
};

const makeSut = () => {
  const dbReceiveAllMessage = makeDbReceiveAllMessageStub();
  const sut = new ReceiveAllMessagesEvent(dbReceiveAllMessage);

  return {
    sut,
    dbReceiveAllMessage,
  };
};

const fakeData: any = {
  key: "fake-key",
};

describe("ReceiveAllMessage Event", () => {
  test("should call receiveAllMessage with correct values", async () => {
    const { sut, dbReceiveAllMessage } = makeSut();
    const getSpy = jest.spyOn(dbReceiveAllMessage, "get");

    await sut.handle(socketMock, fakeData);

    expect(getSpy).toBeCalledWith({
      key: fakeData.key,
    });
  });

  test("should call emit with correct values", async () => {
    const { sut, dbReceiveAllMessage } = makeSut();

    await sut.handle(socketMock, fakeData);

    const response = await dbReceiveAllMessage.get({
      key: fakeData.key,
    });

    expect(socketMock.emit).toHaveBeenCalledWith("ReceiveMessages", response);
  });

  test("should emit an error when throws", async () => {
    const { sut, dbReceiveAllMessage } = makeSut();

    const err = new Error();
    jest.spyOn(dbReceiveAllMessage, "get").mockRejectedValue(new Error());

    await sut.handle(socketMock, fakeData);

    expect(socketMock.emit).toBeCalledWith("Error", err);
  });
});
