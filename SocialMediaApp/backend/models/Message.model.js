import mongoose from "mongoose";


const MessageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: String
        },
        sender: {
            type: String
        },
        text: {
            type: String
        },
        receiver: {
            type: String,
        },
        readByReceiver: {
            type: Boolean,
            default: false
        }

    }, {
    timestamps: true
})

export default mongoose.model("messages", MessageSchema)