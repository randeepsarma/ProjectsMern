import User from "../models/User.js";
import message from "../models/Message.js";
import conversation from "../models/Conversation.js";

export const searchUserInbox = async (req, res) => {

    try {
        //console.log(req.query.search)
        const keyword = req.query.search ?
            {
                $or: [
                    { firstname: { $regex: req.query.search, $options: "i" } },
                    { lastname: { $regex: req.query.search, $options: "i" } }
                    //{ email: { $regex: req.query.search, $options: "i" } }
                ]
            } : {};

        const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

        res.send(users);

    } catch (error) {
        res.send(error)
    }
}



export const newMessage = async (req, res) => {
    try {

        const newMessage = new message(req.body)
        console.log(req.body)
        await newMessage.save()
        //updating the latest message
        let msg = req.body.text
        await conversation.findByIdAndUpdate(req.body.conversationId, {
            message: msg.slice(0, 20) + "...."
        })
        res.status(200).json('Message has been sent successfully')
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getMessages = async (req, res) => {
    try {
        const { convoId } = req.body
        const messages = await message.find({
            conversationId: convoId
        })
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error)
    }
}
export const deleteMessages = async (req, res) => {
    try {
        const messages = await message.deleteMany({ conversationId: req.params.id })
        return res.send('Done')
    } catch (error) {
        return res.send(error)
    }
}