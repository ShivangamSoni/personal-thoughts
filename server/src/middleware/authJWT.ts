import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";

import User from "../models/User";

export const extractJWT: RequestHandler = async (req, res, next) => {
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
};

export const requireAuth: RequestHandler = (req, res, next) => {
    if (req.user == null) {
        return res.status(401).send({ message: "Unauthorized" });
    }

    next();
};
