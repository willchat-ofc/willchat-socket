import { DbSendMessage } from "../../../src/data/usecase/send-message";
import type { SendMessageInput } from "../../../src/domain/usecase/send-message";
import { api } from "../../../src/main/config/axios";

jest.mock("../../../src/main/config/axios");

const makeSut = () => {
  const sut = new DbSendMessage();

  return {
    sut,
  };
};

const fakeData: SendMessageInput = {
  message: "fake-message",
  userId: "fake-user-id",
  userName: "fake-user-name",
  key: "fake-key",
};

describe("SendMessage Database", () => {
  let postSpy: jest.SpyInstance;

  beforeAll(() => {
    postSpy = jest.spyOn(api, "post");
  });

  test("should call api with correct values", async () => {
    const { sut } = makeSut();

    await sut.send(fakeData);

    expect(postSpy).toBeCalledWith("/key/message", fakeData);
  });
});
