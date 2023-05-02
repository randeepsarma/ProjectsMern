import express from 'express'
import {  findWithId, login } from '../controllers/UserAuth.js'
import { register } from '../controllers/UserAuth.js'
import { makeFriends } from '../controllers/UserAuth.js'
import { checkUserAuth } from '../middlewares/checkUserAuth.js'
const router = express.Router()
router.get('/findwithid/:id',findWithId)   
router.post('/login',login);
router.post('/register',register)
router.patch('/addfriend/:userId/:friendId',checkUserAuth,makeFriends)
export default router