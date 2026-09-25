import jwt from "jsonwebtoken";
import {
    type Request, 
    type Response, 
    type NextFunction
} from 'express';
import { type AuthUser } from "../types/authUser.js";

function authUser(
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    const token = req.cookies.token;
    console.log("token", token);
    if(!token) {
        return res.status(401).json({
            success: false,
            message: 'No token found',
            data: null
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthUser;
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
            data: null
        });
    }
}
export default authUser;