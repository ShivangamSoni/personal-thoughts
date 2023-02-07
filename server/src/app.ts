import { config } from "dotenv";
config();

import path from "node:path";

import express from "express";

const app = express();
app.use(express.static(path.join(__dirname, "..", "..", "client", "dist")));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Started at: ${PORT}`);
});
