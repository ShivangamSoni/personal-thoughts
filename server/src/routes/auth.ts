import { Router } from "express";

import User from "../models/User";

import { hashPassword, validatePassword } from "../utils/password";
import { issueJwt } from "../utils/jwt";

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

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || email.trim() === "" || !password || password.trim() === "") {
        return res
            .status(400)
            .send({ success: false, message: "Invalid Data" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Incorrect Email or Password",
            });
        }

        const isVerified = validatePassword(password, user.salt, user.hash);
        if (!isVerified) {
            return res.status(400).send({
                success: false,
                message: "Incorrect Email or Password",
            });
        }

        const token = issueJwt(user.id);
        res.status(201).send({ success: true, token });
    } catch {}
});

export const authRouter = router;
