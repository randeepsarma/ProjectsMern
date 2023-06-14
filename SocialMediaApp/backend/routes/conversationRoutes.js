import express from 'express'
import { newConversation,/*  getConversation, */ getConversationsOfUser, deleteConversation } from '../controllers/conversation-controller.js'

const router = express.Router()

router.post('/add', newConversation)
// router.post('/get', getConversation)
router.get('/getAll/:senderId', getConversationsOfUser)
router.delete('/delete', deleteConversation)
export default router;
