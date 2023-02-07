import mongoose from "mongoose";

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        mongoose.set("strictQuery", false);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("MongoDB Connection Error");
        if (process.env.NODE_ENV === "development") {
            console.error(err);
        }
    }
})();
