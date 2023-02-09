import { Router } from "express";

import User from "../models/User";
import { requireAuth } from "../middleware/authJWT";

const router = Router();

router.get("/", requireAuth, (req, res) => {
    const user = req.user!;
    res.send({
        name: user.name,
        email: user.email,
        membership: user.membership,
    });
});

router.post("/membership/join", requireAuth, async (req, res) => {
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
});

router.post("/membership/leave", requireAuth, async (req, res) => {
    const id = req.user!.id;

    await User.findByIdAndUpdate(id, {
        membership: false,
    });
    res.status(201).send({ message: "Membership Revoked" });
});

export const userRouter = router;
