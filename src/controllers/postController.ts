import { NextFunction, Request, Response } from "express";
import {User} from "../models/User";
import { Post } from "../models/Post";

export const getAllPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
       const posts = await Post.find();
       res.status(200).json(posts); 

       } catch (error) {
       res.status(400).json({"error": error})
      }
}

export const createPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
        const {title,content,userId} = req.body;
        if (!userId) {
        res.status(400).json({message:"User ID is required"});
       };
        const user = await User.findById(userId)
        if (!user) {
        res.status(404).json({message:"User not found"})
       };
         const newPost = new Post({
          title,
          content,
          author:userId,
       });

       await newPost.save();
      res.status(201).json(newPost);

       } catch (error) {
      res.status(500).json({ message: "Error creating post", error });
    }
}

export const deletePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

   try {
    const {email} = req.body;
    const {postId} = req.params;

    const user = await User.findOne({email});
    if (!user) {
        res.status(300).json("user does not exist");
        return;
    };
    
    const post = await Post.findById(postId);
    if (!post) {
        res.status(404).json({message:"Post not found"});
        return;
    };
  
    if (post.author.toString() !== (user as any)._id.toString()) {
        res.status(401).json({message:"Unauthorized:You can't delete this post"})
        return;
    };
     
    await Post.findByIdAndDelete(postId);
    res.status(200).json("Post deleted successfully");

   } catch (error) {
       next(error); 
   }

}