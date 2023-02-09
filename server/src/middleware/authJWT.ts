import { NextFunction, Request, RequestHandler, Response } from "express";
import { verify } from "jsonwebtoken";

import User, { IUserDocument } from "../models/User";

export interface RequestWithUser extends Request {
    user: IUserDocument;
}

export async function extractJWT(
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
) {
    const authorize = req.headers.authorization;
    if (typeof authorize === "undefined") {
        return next();
    }

    const [bearer, token] = authorize.split(" ");
    if (bearer !== "Bearer") {
        return next();
    }

    const payload = verify(token, process.env.JWT_KEY!);
    const user = await User.findById(payload.sub);
    if (!user) {
        return next();
    }

    req.user = user;
    next();
}

export function requireAuth(
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
) {
    if (req.user == null) {
        return res.status(401).send({ message: "Unauthorized" });
    }

    next();
}
