export interface SendMessageInput {
  key: string;
  message: string;
  userName: string;
  userId: string;
}

export interface SendMessage {
  send: (data: SendMessageInput) => Promise<any>;
}
