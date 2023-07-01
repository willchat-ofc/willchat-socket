import { DbSendMessage } from "../../../data/usecase/send-message";
import { SendMessageEvent } from "../../../presentation/events/send-message";
import { makeSendMessageValidation } from "./send-message-validator";

export const makeSendMessageEvent = () => {
  const validator = makeSendMessageValidation();
  const dbSendMessage = new DbSendMessage();
  const sendMessageEvent = new SendMessageEvent(validator, dbSendMessage);

  return sendMessageEvent;
};
