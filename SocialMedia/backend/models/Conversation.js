import mongoose from 'mongoose'

const conversationSchema = new mongoose.Schema({
    members: {
        type: Array
    },
    message: {
        type: String,

    },
    details: {
        type: Map,
        of: {
            type: Map,
            of: String
        },

        default: {}
    },
}, {
    timestamps: true
})

const conversation = mongoose.model('Conversation', conversationSchema)

export default conversation