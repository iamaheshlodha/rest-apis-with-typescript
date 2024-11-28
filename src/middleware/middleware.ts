import {Response, NextFunction} from "express"
import {verifyToken, COOKIE_NAME} from '../jwt'

export const authentication = (req: any, res: any, next: NextFunction) => {
    const token = req.cookies.jwt
    console.log('token :>> ', token);

    if(!token){
        return res.status(401).json({message: "Authentication token not found"})
    }

    const decoded = verifyToken(token)

    if(!decoded){
        return res.status(403).json({message: "Invalid or expired token"})
    }

    req.user = decoded

    next()
}