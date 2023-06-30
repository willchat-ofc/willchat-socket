export interface ReceiveAllMessagesInput {
  accessToken: string;
  key: string;
}

export interface ReceiveAllMessages {
  get: (data: ReceiveAllMessagesInput) => Promise<Array<any>>;
}
