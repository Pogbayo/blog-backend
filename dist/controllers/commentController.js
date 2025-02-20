"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.addComment = void 0;
const User_1 = require("../models/User");
const Post_1 = require("../models/Post");
const Comment_1 = require("../models/Comment");
const addComment = async (req, res, next) => {
    try {
        const { postId, userId } = req.params;
        const { text } = req.body;
        const post = await Post_1.Post.findById(postId);
        const user = await User_1.User.findById(userId);
        console.log("Received postId:", postId, "userId:", userId, "text:", text); // Debugging log
        if (!post) {
            res.status(400).json({ message: "Post doesn't exist" });
            return;
        }
        if (!user) {
            res.status(400).json({ message: "User doesn't exist" });
            return;
        }
        const newComment = new Comment_1.Comment({
            text,
            author: user._id,
            post: post._id,
            createdAt: new Date()
        });
        await newComment.save();
        res.status(201).json({ message: "Comment added successfully", comment: newComment });
    }
    catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.addComment = addComment;
const deleteComment = async (req, res, next) => {
    try {
        const { postId, userId } = req.params;
        const { commentId } = req.body;
        const post = await Post_1.Post.findById(postId);
        const user = await User_1.User.findById(userId);
        const comment = await Comment_1.Comment.findById(commentId);
        if (!post) {
            res.status(400).json({ message: "Post doesn't exist" });
            return;
        }
        ;
        if (!user) {
            res.status(400).json({ message: "User doesn't exist" });
            return;
        }
        ;
        if (!comment) {
            res.status(404).json({ message: "Comment does not exist" });
            return;
        }
        ;
        await Comment_1.Comment.findByIdAndDelete(commentId);
        res.status(201).json("Comment deleted successfully");
    }
    catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.deleteComment = deleteComment;
