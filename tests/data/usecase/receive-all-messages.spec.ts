import { DbReceiveAllMessages } from "../../../src/data/usecase/receive-all-messages";
import type { ReceiveAllMessagesInput } from "../../../src/domain/usecase/receive-all-messages";
import { api } from "../../../src/main/config/axios";

jest.mock("../../../src/main/config/axios");

const makeSut = () => {
  const sut = new DbReceiveAllMessages();

  return {
    sut,
  };
};

const fakeData: ReceiveAllMessagesInput = {
  key: "fake-key",
  limit: 10,
  offset: 0,
};

const fakeResponse = {
  data: [
    {
      id: "fake-id",
      message: "fake-message",
      userId: "fake-user-id",
      userName: "fake-user-name",
    },
  ],
};

describe("ReceiveAllMessages Database", () => {
  jest.spyOn(api, "get").mockResolvedValue(fakeResponse);

  test("should call api with correct values", async () => {
    const { sut } = makeSut();

    await sut.get(fakeData);

    expect(api.get).toHaveBeenCalledWith(`/key/message/${fakeData.key}`, {
      headers: {
        limit: fakeData.limit,
        offset: fakeData.offset,
      },
    });
  });

  test("should returns if success a list of messages", async () => {
    const { sut } = makeSut();

    const res = await sut.get(fakeData);

    expect(res).toStrictEqual(fakeResponse.data);
  });
});
