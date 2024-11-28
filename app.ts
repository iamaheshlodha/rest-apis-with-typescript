import express from "express";
import http from 'http'
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import authRoutes from "./src/routes/authRoutes"
import messageRoutes from "./src/routes/messageRoutes"
import socketHandler from "./src/socket"
dotenv.config()

const port = process.env.PORT || 8001

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

socketHandler(io)

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

app.listen(port, () => {
    console.log(`Server is running ${port}`);
})