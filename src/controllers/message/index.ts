import { Request, Response } from "express";
import { sendValidationSchema } from "./validation";
import Message from "../../models/message";

export const sendMessage = async (req: Request, res: Response) => {
    const { user_id, message, room } = req.body

    const error = sendValidationSchema.validate(req.body)

    if (error?.error) {
        res.status(400).json({ message: error?.error?.details[0].message.replace(/"/g, ''), error: true })
        return
    }

    try {
        const chat: any = await Message.findOne({ where: { room: room } })

        if (chat) {
            console.log('chat :>> ', chat);
            await Message.update({
                messages: [
                    ...chat.messages,
                    { message: message, date: new Date() }
                ]
            }, { where: { id: chat.id } })
        } else {
            await Message.create({ user_id, messages: [{ message: message, date: new Date() }], room: room })
        }

        res.status(201).json({ message: "Message send successfully", error: false })
    } catch (error) {
        res.status(500).json({ message: error, error: true })
    }
}