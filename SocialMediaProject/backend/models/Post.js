import mongoose from "mongoose";
import commentSchema from "./Comment.js";
const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    trim: true
  },
  description: {
    type: String,

    trim: true
  },
  postUrl: {
    type: String,

    trim: true
  },
  //this is an array of ids of comments related to the post
  comments: {

    type: Map,
    of: Boolean,
    default: {}
  },
  likes: {
    type: Map,
    of: Boolean,
    default: {}
  }

}, { timestamps: true })

export default mongoose.models.Post || mongoose.model("Post", postSchema)

