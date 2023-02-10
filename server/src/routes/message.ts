import { Router } from "express";

import { RequestWithUser, requireAuth } from "../middleware/authJWT";
import Message from "../models/Message";
import { IUserDocument } from "../models/User";

const router = Router();

// @ts-expect-error
router.get("/", async (req: RequestWithUser, res) => {
    const user = req.user;

    const showUser = user && user.membership;
    let messagesData;
    if (showUser) {
        const messages = await Message.find(
            {},
            {
                title: 1,
                message: 1,
                createdAt: 1,
            },
        )
            .sort({
                createdAt: -1,
            })
            .populate<{ user: IUserDocument }>("user");

        messagesData = messages.map((message) => {
            return {
                id: message.id,
                title: message.title,
                message: message.message,
                createdAt: message.createdAt,
                user: {
                    name: message.user.name,
                },
            };
        });
    } else {
        const messages = await Message.find(
            {},
            {
                title: 1,
                message: 1,
            },
        ).sort({
            createdAt: -1,
        });

        messagesData = messages.map((message) => {
            return {
                id: message.id,
                title: message.title,
                message: message.message,
            };
        });
    }

    res.send({ type: "message", messages: messagesData });
});

// @ts-expect-error
router.post("/", requireAuth, async (req: RequestWithUser, res) => {
    const { id } = req.user!;
    const { title, message } = req.body;

    if (!title || title.trim() === "" || !message || message.trim() === "") {
        return res
            .status(400)
            .send({ success: false, message: "Invalid Data" });
    }

    await new Message({
        title,
        message,
        user: id,
    }).save();
    res.status(201).send({ message: "Message Posted" });
});

export const messageRouter = router;
