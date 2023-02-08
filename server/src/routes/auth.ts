import { Router } from "express";

import User from "../models/User";
import { hashPassword } from "../utils/password";

const router = Router();

router.post("/register", async (req, res, next) => {
    const { first_name, last_name, email, password } = req.body;

    const { hash, salt } = hashPassword(password);

    if (
        !first_name ||
        first_name.trim() === "" ||
        !last_name ||
        last_name.trim() === "" ||
        !email ||
        email.trim() === "" ||
        !password ||
        password.trim() === ""
    ) {
        return res
            .status(400)
            .send({ success: false, message: "Invalid Data" });
    }

    try {
        const user = await new User({
            first_name,
            last_name,
            email,
            hash,
            salt,
        }).save();
        res.status(201).send({ message: "Registered" });
    } catch (e) {
        res.send({ success: false, message: "Invalid Email or Password" });
    }
});

export const authRouter = router;
