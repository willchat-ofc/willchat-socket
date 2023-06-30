import type {
  SendMessage,
  SendMessageInput,
} from "../../domain/usecase/send-message";
import { api } from "../../main/config/axios";

export class DbSendMessage implements SendMessage {
  public async send(data: SendMessageInput): Promise<void> {
    await api.post("/key/message", data);
  }
}
