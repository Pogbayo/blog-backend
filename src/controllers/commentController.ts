import { NextFunction, Request, Response } from "express";
import  { User }  from "../models/User";
import { Post } from "../models/Post";
import {Comment} from "../models/Comment"; 

export const addComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {postId,userId} = req.params;
    const {text} = req.body;

    const post = await Post.findById(postId);
    const user = await User.findById(userId);
   
    console.log("Received postId:", postId, "userId:", userId, "text:", text); // Debugging log

    if (!post) {
        res.status(400).json({message:"Post doesn't exist"});
        return;
    }

    if (!user) {
        res.status(400).json({message:"User doesn't exist"});
        return;
    }

     const newComment = new Comment({
        text,
        author: user._id,
        post: post._id,
        createdAt: new Date()
     });

     await newComment.save(); 
     res.status(201).json({ message: "Comment added successfully", comment: newComment });

  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {postId,userId} = req.params;
    const {commentId} = req.body;

    const post = await Post.findById(postId);
    const user = await User.findById(userId);
    const comment = await Comment.findById(commentId);

    if (!post) {
        res.status(400).json({message:"Post doesn't exist"});
        return;
    };

    if (!user) {
        res.status(400).json({message:"User doesn't exist"});
        return;
    };
    
    if(!comment){
        res.status(404).json({message:"Comment does not exist"});
        return;
    };

     await Comment.findByIdAndDelete(commentId); 
     res.status(201).json( "Comment deleted successfully");

  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}