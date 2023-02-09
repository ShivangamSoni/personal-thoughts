import { Document, Schema, SchemaTimestampsConfig, model } from "mongoose";
import { IUserDocument } from "./User";

export interface IMessageDocument extends Document, SchemaTimestampsConfig {
    title: string;
    message: string;
    user: IUserDocument["_id"];
}

const MessageSchema = new Schema(
    {
        title: { type: String, required: true },
        message: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    {
        timestamps: {
            updatedAt: false,
        },
    },
);

export default model<IMessageDocument>("Message", MessageSchema);
