import express from "express";
import http from "http";
import { Server } from "socket.io";
import { makeEvents } from "./events";

const app = express();

const server = http.createServer(app);
const io = new Server(server);
makeEvents(io);

export { server };
