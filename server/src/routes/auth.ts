import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send({ type: "auth" });
});

export const authRouter = router;
