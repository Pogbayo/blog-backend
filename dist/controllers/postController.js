"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.createPost = exports.getAllPosts = void 0;
const User_1 = require("../models/User");
const Post_1 = require("../models/Post");
const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post_1.Post.find();
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(400).json({ "error": error });
    }
};
exports.getAllPosts = getAllPosts;
const createPost = async (req, res, next) => {
    try {
        const { title, content, userId } = req.body;
        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
        }
        ;
        const user = await User_1.User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        ;
        const newPost = new Post_1.Post({
            title,
            content,
            author: userId,
        });
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating post", error });
    }
};
exports.createPost = createPost;
const deletePost = async (req, res, next) => {
    try {
        const { email } = req.body;
        const { postId } = req.params;
        const user = await User_1.User.findOne({ email });
        if (!user) {
            res.status(300).json("user does not exist");
            return;
        }
        ;
        const post = await Post_1.Post.findById(postId);
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        ;
        if (post.author.toString() !== user._id.toString()) {
            res.status(401).json({ message: "Unauthorized:You can't delete this post" });
            return;
        }
        ;
        await Post_1.Post.findByIdAndDelete(postId);
        res.status(200).json("Post deleted successfully");
    }
    catch (error) {
        next(error);
    }
};
exports.deletePost = deletePost;
