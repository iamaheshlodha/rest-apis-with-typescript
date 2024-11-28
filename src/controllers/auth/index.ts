import { Request, Response } from "express";
import User from "../../models/user";
import { userValidationSchema } from "./validation";
import { generateToken, COOKIE_NAME, cookieOptions } from "../../jwt";

export const registerUser = async (req: Request, res: Response) => {
    const { username, password } = req.body

    const error = userValidationSchema.validate(req.body)

    if (error?.error) {
        res.status(400).json({ message: error?.error?.details[0].message.replace(/"/g, ''), error: true })
        return
    }

    try {
        await User.create({ username, password })

        res.status(201).json({ message: "User register successfully", error: false })
    } catch (error) {
        res.status(500).json({ message: error, error: true })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body

    const error = userValidationSchema.validate(req.body)

    if (error?.error) {
        res.status(400).json({ message: error?.error?.details[0].message.replace(/"/g, ''), error: true })
        return
    }

    try {

        const user = await User.findOne({ where: { username: username } })

        if (user) {
            const userData = await User.findOne({ where: { username: username, password: password } })

            if (userData) {
                const token = generateToken({ username: userData.username, password: userData.password }, '1h')
                
                res.clearCookie(COOKIE_NAME)
                res.cookie(COOKIE_NAME, token, cookieOptions)
                res.status(200).json({ message: "Login successful", error: false })
            } else {
                res.status(400).json({ message: "Password is incorrect", error: true })
            }
        } else {
            res.status(400).json({ message: "User not found", error: true })
        }
    } catch (error) {
        res.status(500).json({ message: error, error: true })
    }
}