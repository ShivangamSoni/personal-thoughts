import { config } from "dotenv";
config();

import path from "node:path";

import express from "express";
import passport from "passport";

import { apiRouter } from "./routes/api";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Passport
import "./utils/passport";
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, "..", "..", "client", "dist")));

app.use("/api", apiRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Started at: ${PORT}`);
});

import "./utils/db";
