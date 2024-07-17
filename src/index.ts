import express from "express"
import HttpServer from "./class/server.class";
import cors from "cors";
import router from "./routes";


const server = HttpServer.instance

server.app.enable('trust proxy');
server.app.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.app.use(express.json({ limit: "50mb" }));
server.app.use(cors({ origin: true, credentials: true }));

server.app.use("/api",router)


server.start();