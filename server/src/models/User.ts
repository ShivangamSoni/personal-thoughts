import { Document, Schema, model } from "mongoose";

export interface IUserDocument extends Document {
    first_name: string;
    last_name: string;
    email: string;
    hash: string;
    salt: string;
    membership: boolean;
    admin: boolean;
    // Virtual
    name: string;
}

const UserSchema = new Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        hash: { type: String, required: true },
        salt: { type: String, required: true },
        membership: { type: Boolean, required: true, default: false },
        admin: { type: Boolean, required: true, default: false },
    },
    {
        timestamps: {
            updatedAt: false,
        },
    },
);

// Unique Email
UserSchema.path("email").validate(async function (value, done) {
    const count = await this.$model("User").count({ email: value });
    return count === 0;
}, "Email already exist");

// Virtual Property: name
UserSchema.virtual("name").get(function () {
    return `${this.first_name} ${this.last_name}`;
});

export default model<IUserDocument>("User", UserSchema);
