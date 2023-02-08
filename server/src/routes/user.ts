import { Router } from "express";
import passport from "passport";

import User from "../models/User";

const router = Router();

router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const user = req.user as any;
        res.send({
            name: user.name,
            email: user.email,
            membership: user.membership,
        });
    },
);

router.post(
    "/membership/join",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const id = (req.user as any).id;
        const { code } = req.body;

        if (!code || code.trim() === 0 || code !== "The Odin Project") {
            return res
                .status(400)
                .send({ success: false, message: "Invalid Join Code" });
        }

        try {
            const user = await User.findByIdAndUpdate(id, {
                membership: true,
            });
            res.status(201).end();
        } catch {}
    },
);

router.post(
    "/membership/leave",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const id = (req.user as any).id;

        try {
            const user = await User.findByIdAndUpdate(id, {
                membership: false,
            });
            res.status(201).end();
        } catch {}
    },
);

export const userRouter = router;
