import { ErrorRequestHandler, Router } from "express";

import { authRouter } from "./auth";
import { userRouter } from "./user";
import { messageRouter } from "./message";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/messages", messageRouter);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(500).send({ message: "Server Error" });
};
router.use(errorHandler);

export const apiRouter = router;
