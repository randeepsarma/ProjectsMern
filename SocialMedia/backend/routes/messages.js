import express from 'express'
import Message from '../modelsTwo/Message.js'
const router = express.Router()
//add
router.post("/", async (req, res) => {
    const newMessage = new Message(req.body)

    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(err)
    }


})
//get
router.get("/:conversationId", async (req, res) => {

    try {
        const searchedmessages = await Message.find({
            conversationId: req.params.conversationId,
        })

        res.status(200).json(searchedmessages)
    } catch (error) {
        res.status(500).json(err)
    }

})

export default router