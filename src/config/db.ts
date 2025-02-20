import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("DB connected successfully")
    } catch (error) {
        console.error("Mongo connection failed",error);
        process.exit(1)
    }
}
export default connectDB;
