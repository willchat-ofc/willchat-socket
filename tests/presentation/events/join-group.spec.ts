import { JoinGroupEvent } from "../../../src/presentation/events/join-group";
import { socketMock } from "../../mocks/socket";

const makeSut = () => {
  const sut = new JoinGroupEvent();

  return {
    sut,
  };
};

const fakeData = {
  key: "fake-key",
};

describe("JoinGroup Event", () => {
  test("should call socket.join with correct values", async () => {
    const { sut } = makeSut();
    await sut.handle(socketMock, fakeData);

    expect(socketMock.join).toBeCalledWith(fakeData.key);
  });

  test("should emit an error when throws", async () => {
    const { sut } = makeSut();

    const err = new Error();
    jest.spyOn(socketMock, "join").mockImplementation(() => {
      throw err;
    });

    await sut.handle(socketMock, fakeData);

    expect(socketMock.emit).toBeCalledWith("Error", err);
  });
});
