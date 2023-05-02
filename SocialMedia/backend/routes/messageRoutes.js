import express from 'express'
import { getMessages, newMessage, searchUserInbox, deleteMessages } from '../controllers/message-controller.js'
import { checkUserAuth } from '../middlewares/checkUserAuth.js'
const router = express.Router()


router.get('/search', checkUserAuth, searchUserInbox)
router.post('/add', checkUserAuth, newMessage)
router.post('/get', getMessages)
router.delete('/delete/:id', deleteMessages)
export default router