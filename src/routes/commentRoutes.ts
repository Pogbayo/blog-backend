import express from "express";
import { addComment,deleteComment } from "../controllers/commentController";

const router = express.Router();

router.post("/comment/:postId/:userId",addComment);
router.delete("/comment/:postId/:userId",deleteComment);

export {router as commentRoutes}