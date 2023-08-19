export interface ReceiveAllMessagesInput {
  key: string;
  limit?: number;
  offset?: number;
}

export interface ReceiveAllMessages {
  get: (data: ReceiveAllMessagesInput) => Promise<Array<any>>;
}
