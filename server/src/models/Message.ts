import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
    {
        title: { type: String, require: true },
        message: { type: String, require: true },
        user: { type: Schema.Types.ObjectId, ref: "User", require: true },
    },
    {
        timestamps: {
            updatedAt: false,
        },
    },
);

export default model("Message", MessageSchema);
