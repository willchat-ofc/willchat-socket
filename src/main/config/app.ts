import express from "express";
import http from "http";
import https from "https";
import { Server } from "socket.io";
import { makeEvents } from "./events";
import { env } from "./env";

const app = express();

let server: any;

if (env.cert) {
  server = https.createServer(
    {
      cert: env.cert,
      key: env.key,
    },
    app
  );
} else {
  server = http.createServer(app);
}

const io = new Server(server);
makeEvents(io);

export { server };
