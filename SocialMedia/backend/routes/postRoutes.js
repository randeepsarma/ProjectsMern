import express from 'express'
import { createPost, deleteComment, deletePost, findComments, getAllPosts, likePost, setComment } from '../controllers/PostController.js'

import { checkUserAuth } from '../middlewares/checkUserAuth.js'
const router = express.Router()

router.get('/', getAllPosts)

router.post('/create', checkUserAuth, createPost)
router.delete('/delete', checkUserAuth, deletePost)
router.patch('/likepost', likePost)
router.post('/makeComment', checkUserAuth, setComment)
router.get('/getComments/:postId', checkUserAuth, findComments)
router.delete('/deleteComment', deleteComment)

export default router