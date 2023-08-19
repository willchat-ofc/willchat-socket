import type {
  ReceiveAllMessages,
  ReceiveAllMessagesInput,
} from "../../domain/usecase/receive-all-messages";
import { api } from "../../main/config/axios";

export class DbReceiveAllMessages implements ReceiveAllMessages {
  public async get(data: ReceiveAllMessagesInput): Promise<Array<any>> {
    return (
      await api.get(`/key/message/${data.key}`, {
        headers: {
          offset: data.offset,
          limit: data.limit,
        },
      })
    ).data;
  }
}
