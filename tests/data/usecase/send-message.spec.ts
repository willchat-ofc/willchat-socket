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
    postSpy = jest.spyOn(api, "post").mockResolvedValue({
      data: {
        createdAt: "2023-08-18T20:32:06.576Z",
        id: "27c6a8b3-289b-456a-804b-7adc431a6e86",
        message: "a",
        userId: "123",
        userName: "Willian",
      },
    });
  });

  test("should call api with correct values", async () => {
    const { sut } = makeSut();
    await sut.send(fakeData);

    expect(postSpy).toHaveBeenCalledWith("/key/message", fakeData);
  });
});
