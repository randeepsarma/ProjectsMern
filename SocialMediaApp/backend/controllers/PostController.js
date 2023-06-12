
//here we don't have to check the user 
import Post from "../models/Post.js"

import { pusher } from "../index.js";

import Comment from "../models/Comment.js";
import { destroyImage } from "../utils/functions.js";
export const createPost = async (req, res, next) => {
    //postUrl inside file

  
    const { description,postUrl, userId } = req.body

    //console.log(req.body)
    if (postUrl || description) {
        let newPost;
        if (postUrl && description) {
             newPost = new Post({
                userId,
                description,
                postUrl
            })
        } else if (postUrl) {
             newPost = new Post({
                userId,
                postUrl
            })
        } else if (description) {
             newPost = new Post({
                userId,
                description
            })
        }
        const ans = await newPost.save()
       pusher.trigger('live-feed-channel','update-event',ans)
        res.status(201).send({ "status": "success", "message": "Post Upload Successfull", color: "red" })
    } else return res.send({ "status": "failed", "message": "No file or description", color: "red" })
}

//Delete post
export const deletePost = async (req, res, next) => {
    //console.log(req.body)
    try {
        const { id } = req.body;
        const post = await Post.deleteOne({ _id: id })
       
        if (req.body.postUrl) {
            const { postUrl } = req.body
            await destroyImage(postUrl)
        }
        
        //console.log(post)
        pusher.trigger('live-feed-channel', 'delete-post',{deletedId:id,userId:req.body.userId});
        await Comment.deleteMany({ postId: id })
        
        res.send({ "status": "success", "message": "User post and comments deleted", deletedPost: post })
    } catch (error) {
        res.send({ "status": "failed", "message": error })
    }
}

//Edit post
export const editPost = async (req, res, next) => {
    try {

    } catch (error) {
        res.send({ "status": "failed", "message": error })
    }
}

//Get all posts
export const getAllPosts = async (req, res, next) => {
    try {

        const userPosts = await Post.find().sort({ createdAt: -1 });
        //console.log(userPosts)
        res.send({ "status": "success", "message": userPosts })
    } catch (error) {
        res.send({ "status": "failed", "message": error })
    }
}

//like post
export const likePost = async (req, res, next) => {
    try {
        const { postId, guestId } = req.body;
        let reqdPost = await Post.findOne({ _id: postId })
        if (reqdPost.likes.get(guestId)) {
            reqdPost.likes.delete(guestId)
        } else {
            reqdPost.likes.set(guestId, true)
        }
        await Post.findByIdAndUpdate(postId, { likes: reqdPost.likes })
        res.send({ "status": "success", "message": "Like feature updated", updatedPost: reqdPost })
    } catch (error) {
        res.send({ "status": "failed", "message": error })
    }
}

export const setComment = async (req, res, next) => {
    try {
        //console.log(req.body)
        const newComment = new Comment(req.body)
        const comment = await newComment.save()
        res.status(201).send(comment)
    } catch (error) {
        res.status(400).send(error)
    }
}
export const findComments = async (req, res, next) => {

    try {
        const allComments = await Comment.find({ postId: req.params.postId })
        //console.log(allComments)
        res.send(allComments)
    } catch (error) {
        res.status(400).send(error)
    }
}
export const deleteComment = async (req, res) => {
    try {

        const deletedComment = await Comment.deleteOne({ _id: req.body.commentId })
        res.send(deletedComment)
    } catch (error) {
        res.send(error)
    }
}

