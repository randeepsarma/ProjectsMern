import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  firstname:
    { type: String, required: true, trim: true, min: 2, max: 30 },
  lastname:
    { type: String, required: true, trim: true, min: 2, max: 30 },
  location:
    { type: String, required: true, trim: true, min: 2, max: 20 },
  occupation:
    { type: String, required: true, trim: true, min: 2, max: 20 },
  imageUrl:
    { type: String, required: true, trim: true, min: 2, max: 40 },
  email:
    { type: String, required: true, trim: true, min: 2, max: 50 },
  password:
    { type: String, required: true, min: 2, max: 16, select: false },
  friends: {
    type: Map,
    of: Boolean,
    default: {}
  },
  mode: {
    type: String,
    default: "light"
  },
  viewedProfile: Number,
  impressions: Number
}, { timestamps: true })

export default mongoose.models.User || mongoose.model("User", userSchema)

