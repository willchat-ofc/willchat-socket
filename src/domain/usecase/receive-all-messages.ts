export interface ReceiveAllMessagesInput {
  key: string;
}

export interface ReceiveAllMessages {
  get: (data: ReceiveAllMessagesInput) => Promise<Array<any>>;
}
