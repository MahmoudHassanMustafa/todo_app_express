import { User } from "@prisma/client";
import { Request } from "express";
export interface UserAttachedRequest extends Request {
    user?: User;
}
