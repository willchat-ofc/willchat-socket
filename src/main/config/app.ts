import express from "express";
import https from "https";
import { Server } from "socket.io";
import { makeEvents } from "./events";
import { env } from "./env";

const app = express();

const server = https.createServer(
  {
    cert: env.cert,
    key: env.key,
  },
  app
);

const io = new Server(server);
makeEvents(io);

export { server };
