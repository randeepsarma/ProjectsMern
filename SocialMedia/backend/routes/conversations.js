import express from 'express'
import Conversation from '../modelsTwo/Conversation.js'
const router = express.Router()

router.post("/", async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],

    })
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation)
    } catch (error) {
        res.status(500).json(err)
    }

})

router.get("/:userId", async (req, res) => {

    try {
        const searchedConvo = await Conversation.find({
            members: { $in: [req.params.userId] }

        })

        res.status(200).json(searchedConvo)
    } catch (error) {
        res.status(500).json(err)
    }

})

export default router