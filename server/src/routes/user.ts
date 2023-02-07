import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send({ type: "user" });
});

export const userRouter = router;
