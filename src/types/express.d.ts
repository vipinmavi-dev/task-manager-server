import jwt from "jsonwebtoken";
import { type AuthUser } from "../types/authUser.js";

declare global {
    namespace Express {
        interface Request {
            user: AuthUser;
        }
    }
}