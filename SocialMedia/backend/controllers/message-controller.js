// import User from "../models/User.js";
import message from "../models/Message.model.js";
import conversation from "../models/Conversation.model.js";
import MessageModel from "../models/Message.model.js";

// export const searchUserInbox = async (req, res) => {

//     try {
//         //console.log(req.query.search)
//         const keyword = req.query.search ?
//             {
//                 $or: [
//                     { firstname: { $regex: req.query.search, $options: "i" } },
//                     { lastname: { $regex: req.query.search, $options: "i" } }
//                     //{ email: { $regex: req.query.search, $options: "i" } }
//                 ]
//             } : {};

//         const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

//         res.send(users);

//     } catch (error) {
//         res.send(error)
//     }
// }
export const newMessage = async (req, res) => {
    try {
        //console.log(req.body)
        const newMessage = new message(req.body)

        const n = await newMessage.save()
        //updating the latest message
        let msg = req.body.text
        await conversation.findByIdAndUpdate(req.body.conversationId, {
            lastmessage: msg.length < 20 ? msg : msg.slice(0, 20) + "...."
        })
        // console.log(n)

        res.status(200).send('Message sent successfully')
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getMessages = async (req, res) => {
    try {

        const { convoId } = req.params

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
export const updateMessageRead = async (req, res) => {
    try {

        const { userId } = req.body;
        await MessageModel.updateMany({ receiver: userId }, { $set: { readByReceiver: true } })
        res.status(200).json('yes')
    } catch (error) {
        res.status(404).json(error)
    }
}
export const getUnreadMessages = async (req, res) => {
    try {
        const { userId } = req.body
        let numOfUnread = await MessageModel.find({ receiver: userId, readByReceiver: false }).count()
        res.status(200).json(numOfUnread)
    } catch (error) {
        res.status(400).json(error)
    }
}