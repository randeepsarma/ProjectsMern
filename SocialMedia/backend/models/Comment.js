import mongoose from "mongoose";
//Linked List
const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    trim: true
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true })

export default mongoose.models.Comment || mongoose.model("Comment", commentSchema)

