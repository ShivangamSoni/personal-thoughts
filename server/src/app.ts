import { config } from "dotenv";
config();

import path from "node:path";

import express from "express";

import { apiRouter } from "./routes/api";
import { sessionMiddleware } from "./utils/session";

const app = express();
app.use(sessionMiddleware);

app.use(express.static(path.join(__dirname, "..", "..", "client", "dist")));

app.use("/api", apiRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Started at: ${PORT}`);
});

import "./utils/db";
