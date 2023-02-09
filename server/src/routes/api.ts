import { ErrorRequestHandler, RequestHandler, Router } from "express";

import { authRouter } from "./auth";
import { userRouter } from "./user";
import { messageRouter } from "./message";
import { extractJWT } from "../middleware/authJWT";

const router = Router();

// @ts-expect-error
router.use(extractJWT);

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/messages", messageRouter);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({ message: "Server Error" });
};
router.use(errorHandler);

export const apiRouter = router;
