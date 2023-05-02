import mongoose from "mongoose";
//Linked List
const commentSchema = new mongoose.Schema({
  nextId:{
    type:mongoose.Schema.ObjectId,
    required:true,
    trim:true
  },
  description:{
    type:String,
    required:true,
    trim:true
  },
  likes:{
    type: Map,
    of: Boolean,
    default : {}
  }
},{timestamps:true})

export default mongoose.models.Comment || mongoose.model("Comment",commentSchema)

