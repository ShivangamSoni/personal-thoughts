import { RequestHandler, Router } from "express";

import User from "../models/User";
import { RequestWithUser, requireAuth } from "../middleware/authJWT";

const router = Router();

// @ts-expect-error
router.get("/", requireAuth, (req: RequestWithUser, res) => {
    const user = req.user!;
    res.send({
        name: user.name,
        email: user.email,
        membership: user.membership,
    });
});

router.post(
    "/membership/join",
    // @ts-expect-error
    requireAuth,
    async (req: RequestWithUser, res) => {
        const id = req.user!.id;
        const { code } = req.body;

        if (!code || code.trim() === 0 || code !== "The Odin Project") {
            return res
                .status(400)
                .send({ success: false, message: "Invalid Join Code" });
        }

        await User.findByIdAndUpdate(id, {
            membership: true,
        });
        res.status(201).send({ message: "Membership Granted" });
    },
);

router.post(
    "/membership/leave",
    // @ts-expect-error
    requireAuth,
    async (req: RequestWithUser, res) => {
        const id = req.user!.id;

        await User.findByIdAndUpdate(id, {
            membership: false,
        });
        res.status(201).send({ message: "Membership Revoked" });
    },
);

export const userRouter = router;
