import { ReceiveAllMessagesEvent } from "../../../presentation/events/receive-all-messages";
import { DbReceiveAllMessages } from "../../../data/usecase/receive-all-messages";
import { makeReceiveAllMessageValidation } from "./receive-all-messages-validation";

export const makeReceiveAllMessageEvent = () => {
  const dbReceiveAllMessage = new DbReceiveAllMessages();
  const validator = makeReceiveAllMessageValidation();
  const receiveAllMessageEvent = new ReceiveAllMessagesEvent(
    dbReceiveAllMessage,
    validator
  );

  return receiveAllMessageEvent;
};
