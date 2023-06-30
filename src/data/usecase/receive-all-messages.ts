import type {
  ReceiveAllMessages,
  ReceiveAllMessagesInput,
} from "../../domain/usecase/receive-all-messages";
import { api } from "../../main/config/axios";

export class ReceiveAllMessagesDb implements ReceiveAllMessages {
  public async get(data: ReceiveAllMessagesInput): Promise<Array<any>> {
    return api.get(`/key/message/${data.key}`, {
      headers: {
        accessToken: data.accessToken,
      },
    });
  }
}
