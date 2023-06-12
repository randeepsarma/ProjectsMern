import express from 'express'
import { deleteProfile, endProfileImage, findWithId, login } from '../controllers/UserAuth.js'
import { register } from '../controllers/UserAuth.js'
import { makeFriends, updateProfile } from '../controllers/UserAuth.js'
import { checkUserAuth } from '../middlewares/checkUserAuth.js'
const router = express.Router()
router.get('/findwithid/:id', findWithId)
router.post('/login', login);
router.post('/register', register)
router.patch('/addfriend/:userId/:friendId', checkUserAuth, makeFriends)
router.patch('/update',checkUserAuth,updateProfile)
router.delete('/deleteImage',checkUserAuth,endProfileImage)
router.delete('/deleteProfile',checkUserAuth,deleteProfile)


export default router
