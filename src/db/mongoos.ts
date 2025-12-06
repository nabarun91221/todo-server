import mongoose from "mongoose";

export async function connectMongoose() {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: process.env.DATABASE_NAME,
        });

        console.log("Mongoose connected:", conn.connection.host);
    } catch (err) {
        console.error("Mongoose connection error:", err);
        process.exit(1);
    }
}
