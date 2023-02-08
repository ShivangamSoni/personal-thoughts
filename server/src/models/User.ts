import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        first_name: { type: String, require: true },
        last_name: { type: String, require: true },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        hash: { type: String, required: true },
        salt: { type: String, required: true },
        membership: { type: Boolean, required: true, default: false },
        admin: { type: Boolean, required: true, default: false },
    },
    {
        virtuals: {
            name: {
                get() {
                    return `${this.first_name} ${this.last_name}`;
                },
            },
        },
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

export default model("User", UserSchema);
