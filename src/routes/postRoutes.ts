import express from "express";
import { createPost,deletePost, getAllPosts } from "../controllers/postController";

const router = express.Router();

router.post("/post",createPost);
router.delete("/post",deletePost);
router.get("/post",getAllPosts);

export {router as postRoutes};