import express from "express";
import { sendMessage } from "../controllers/message";
import { authentication } from "../middleware/middleware";

const router = express.Router()

router.post('/send', authentication, sendMessage)

export default router