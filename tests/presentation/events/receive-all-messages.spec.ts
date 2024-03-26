import type {
  ReceiveAllMessages,
  ReceiveAllMessagesInput,
} from "../../../src/domain/usecase/receive-all-messages";
import { ReceiveAllMessagesEvent } from "../../../src/presentation/events/receive-all-messages";
import type { Validation } from "../../../src/presentation/protocols/validation";
import { socketMock } from "../../mocks/socket";

const makeValidatorStub = (): Validation => {
  const validatorStub: Validation = {
    validate: jest.fn(),
  };

  return validatorStub;
};

const makeDbReceiveAllMessageStub = (): ReceiveAllMessages => {
  const dbReceiveAllMessagesStub: ReceiveAllMessages = {
    get: jest.fn().mockReturnValue({
      id: "fake-id",
      message: "fake-message",
      userId: "fake-user-id",
      userName: "fake-user-name",
    }),
  };

  return dbReceiveAllMessagesStub;
};

const makeSut = () => {
  const dbReceiveAllMessage = makeDbReceiveAllMessageStub();
  const validator = makeValidatorStub();
  const sut = new ReceiveAllMessagesEvent(dbReceiveAllMessage, validator);

  return {
    sut,
    dbReceiveAllMessage,
    validator,
  };
};

const fakeData: ReceiveAllMessagesInput = {
  key: "fake-key",
  limit: 10,
  offset: 0,
};

describe("ReceiveAllMessage Event", () => {
  test("should return an Error if validator returns an Error", async () => {
    const { sut, validator } = makeSut();
    jest.spyOn(validator, "validate").mockReturnValue(new Error());

    await sut.handle(socketMock, fakeData);

    expect(socketMock.emit).toHaveBeenCalledWith("Error", new Error().message);
  });

  test("should call validator with correct values", async () => {
    const { sut, validator } = makeSut();
    await sut.handle(socketMock, fakeData);

    expect(validator.validate).toHaveBeenCalledWith(fakeData);
  });

  test("should call receiveAllMessage with correct values", async () => {
    const { sut, dbReceiveAllMessage } = makeSut();
    const getSpy = jest.spyOn(dbReceiveAllMessage, "get");

    await sut.handle(socketMock, fakeData);

    expect(getSpy).toHaveBeenCalledWith(fakeData);
  });

  test("should call emit with correct values", async () => {
    const { sut, dbReceiveAllMessage } = makeSut();

    await sut.handle(socketMock, fakeData);

    const response = await dbReceiveAllMessage.get(fakeData);

    expect(socketMock.emit).toHaveBeenCalledWith("ReceiveMessages", response);
  });

  test("should emit an error when throws", async () => {
    const { sut, dbReceiveAllMessage } = makeSut();

    const err = new Error();
    jest.spyOn(dbReceiveAllMessage, "get").mockRejectedValue(new Error());

    await sut.handle(socketMock, fakeData);

    expect(socketMock.emit).toHaveBeenCalledWith("Error", err.message);
  });
});
