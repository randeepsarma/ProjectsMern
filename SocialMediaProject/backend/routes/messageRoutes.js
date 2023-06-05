import express from 'express'
import { getMessages, newMessage, /* searchUserInbox,*/ deleteMessages, updateMessageRead, getUnreadMessages } from '../controllers/message-controller.js'
import { checkUserAuth } from '../middlewares/checkUserAuth.js'
const router = express.Router()


// router.get('/search', checkUserAuth, searchUserInbox)
router.post('/add', checkUserAuth, newMessage)
router.get('/get/:convoId', checkUserAuth, getMessages)
router.put('/updateRead', checkUserAuth, updateMessageRead)
router.delete('/delete/:id', deleteMessages)
export default router
router.post('/get', checkUserAuth, getUnreadMessages)
