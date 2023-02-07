import { config } from "dotenv";
config();

import "../src/utils/db";

import User from "../src/models/User";
import Message from "../src/models/Message";

(async () => {
    const user = await new User({
        first_name: "Test",
        last_name: "User",
        email: "user@test.com",
    }).save();

    const message = await new Message({
        title: "Test Message",
        message: "Developing",
        user: user.id,
    }).save();

    console.log({ user, message });

    process.exit();
})();
