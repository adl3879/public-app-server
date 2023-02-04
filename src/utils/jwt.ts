import { User } from "@prisma/client";
import type { Request } from "express";
import { verify } from "jsonwebtoken";

export function decodeJwtFromRequest(req: Request): User | null {
    // decode jwt and add user to context
    const token = req.headers.authorization?.split(" ")[1];
    let user: User | null = null;
    if (token) {
        try {
            user = verify(token, process.env.JWT_SECRET!) as User;
        } catch (err) {
            console.log(err);
        }
    }

    return user;
}
