import { ReceiveAllMessagesEvent } from "../../presentation/events/receive-all-message";
import { DbReceiveAllMessages } from "../../data/usecase/receive-all-messages";

export const makeReceiveAllMessageEvent = () => {
  const dbReceiveAllMessage = new DbReceiveAllMessages();
  const receiveAllMessageEvent = new ReceiveAllMessagesEvent(
    dbReceiveAllMessage
  );

  return receiveAllMessageEvent;
};
