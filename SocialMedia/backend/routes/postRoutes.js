import express from 'express'
import { createPost, deletePost, getAllPosts, likePost } from '../controllers/PostController.js'

import { checkUserAuth } from '../middlewares/checkUserAuth.js'
const router = express.Router()

router.get('/',getAllPosts)

router.post('/create',checkUserAuth,createPost)
router.delete('/delete',checkUserAuth,deletePost)
router.patch('/likepost',likePost)
export default router