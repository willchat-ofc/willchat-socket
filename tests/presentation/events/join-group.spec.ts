import { JoinGroupEvent } from "../../../src/presentation/events/join-group";
import type { Validation } from "../../../src/presentation/protocols/validation";
import { socketMock } from "../../mocks/socket";

const makeValidatorStub = (): Validation => {
  const validatorStub: Validation = {
    validate: jest.fn(),
  };

  return validatorStub;
};

const makeSut = () => {
  const validator = makeValidatorStub();
  const sut = new JoinGroupEvent(validator);

  return {
    sut,
    validator,
  };
};

const fakeData = {
  key: "fake-key",
};

describe("JoinGroup Event", () => {
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

  test("should call socket.join with correct values", async () => {
    const { sut } = makeSut();
    await sut.handle(socketMock, fakeData);

    expect(socketMock.join).toHaveBeenCalledWith(fakeData.key);
  });

  test("should emit an error when throws", async () => {
    const { sut } = makeSut();

    const err = new Error();
    jest.spyOn(socketMock, "join").mockImplementation(() => {
      throw err;
    });

    await sut.handle(socketMock, fakeData);

    expect(socketMock.emit).toHaveBeenCalledWith("Error", err.message);
  });
});
