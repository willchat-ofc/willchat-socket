import { DbSendMessage } from "../../data/usecase/send-message";
import { SendMessageEvent } from "../../presentation/events/send-message";

export const makeSendMessageEvent = () => {
  const dbSendMessage = new DbSendMessage();
  const sendMessageEvent = new SendMessageEvent(dbSendMessage);

  return sendMessageEvent;
};
