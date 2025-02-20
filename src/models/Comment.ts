import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        post:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post",
            required:true,
        },
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        text:{
            type:String,
            required:true
        },
        likes:{type:Number,default:0},
    },
    {timestamps:true}
)
export const Comment = mongoose.model("Comment",commentSchema)