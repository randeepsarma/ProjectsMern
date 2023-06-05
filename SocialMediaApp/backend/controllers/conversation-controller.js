// import connectMongo from "../database/db.js";
import conversation from "../models/Conversation.model.js";
import message from "../models/Message.model.js";
// import User from "../models/User.js";


export const newConversation = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;

        //console.log(senderId)

        //checking for the existence of conversation
        const exist = await conversation.findOne({
            members: {
                $all: [
                    receiverId,
                    senderId
                ]
            }
        })
        //console.log(exist)
        if (exist) {
            return res.status(200).json(exist);
        }

        // const sender = await User.findById(senderId)
        // const receiver = await User.findById(receiverId)
        // let d = new Map();
        // d.set('name', sender.firstname + " " + sender.lastname)
        // d.set('imageUrl', sender.imageUrl)

        // const peoples = new Map();
        // peoples.set(senderId, d)
        // let d2 = new Map();
        // d2.set('name', receiver.firstname + " " + receiver.lastname)
        // d2.set('imageUrl', receiver.imageUrl)

        // peoples.set(receiverId, d2)


        const newConversation = new conversation({
            members: [senderId, receiverId],
            // details: peoples
        })
        const r = await newConversation.save()
        //console.log(r)

        return res.status(200).json(r)

    } catch (error) {
        res.status(500).json(error)
    }
}

// export const getConversation = async (req, res) => {
//     try {
//         const { senderId, receiverId } = req.body
//         let convo = await conversation.findOne({
//             members: {
//                 $all: [
//                     receiverId,
//                     senderId
//                 ]
//             }
//         })
//         //console.log(convo)

//         res.status(200).json(convo)
//     } catch (error) {
//         res.status(500).json(error)
//     }
// }
export const getConversationsOfUser = async (req, res) => {
    try {
        const { senderId } = req.params

        let convo = await conversation.find({
            members: {
                $all: [
                    senderId
                ]
            }
        }).sort({ updatedAt: -1 });

        res.status(200).json(convo)
    } catch (error) {
        res.status(500).json(error)
    }
}
export const deleteConversation = async (req, res) => {
    try {
        let { convoId } = req.body
        //console.log(convoId)
        let messages = await message.find({ conversationId: convoId })

        await conversation.findByIdAndDelete(convoId)

        return res.status(200).json('Empty conversation deleted')
    } catch (error) {
        return res.status(200).json('Empty conversation deleted')
    }
}