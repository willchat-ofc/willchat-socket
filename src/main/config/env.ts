/* eslint-disable @typescript-eslint/no-magic-numbers */
import { config } from "dotenv";

config();

export const env = {
  chatApi: process.env.CHAT_API,
  port: process.env.PORT || 8080,
  key: process.env.KEY,
  cert: process.env.CERT,
};
