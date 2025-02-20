import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import { userRoutes } from "./routes/userRoutes";
import { postRoutes } from "./routes/postRoutes";
import { commentRoutes } from "./routes/commentRoutes";

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors()); 

connectDB();

app.get("/",(req,res)=>{
    res.send("API is running...")
});

app.use("/api",userRoutes)
app.use("/api",postRoutes)
app.use("/api",commentRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
  console.log(`Server is running on ${PORT}`)
})
