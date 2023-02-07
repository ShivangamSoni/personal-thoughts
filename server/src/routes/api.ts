import { Router } from "express";

import { authRouter } from "./auth";
import { userRouter } from "./user";
import { messageRouter } from "./message";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/messages", messageRouter);

export const apiRouter = router;
