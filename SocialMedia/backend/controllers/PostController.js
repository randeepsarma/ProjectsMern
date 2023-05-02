
//here we don't have to check the user 
import Post from "../models/Post.js"
import { v2 as cloudinary } from 'cloudinary'

//Create a new post
function funct(num, req, res) {
    //configuration for cloud storage
    cloudinary.config({
        cloud_name: "der99pbsq",
        api_key: "214811345337694",
        api_secret: "4mJ4mx_iEnNgPk_yBLg1Gk85v4E"
    });
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, { folder: "Social_Media_posts" }, async (err, result) => {
        try {
            const { description, firstname, lastname, imageUrl, location, userId } = req.body
            //Both file and desc present
            if (num === 1) {
                //creating a new post record in database
                const newPost = new Post({
                    //from token verification
                    userId,
                    description,
                    postUrl: result.url,
                    firstname,
                    lastname,
                    imageUrl,
                    location,
                })

                //saving the record
                const ans = await newPost.save();
                res.status(201).send({ "status": "success", "message": ans, color: "green" })
            }
            //Only file present
            else if (num === 2) {
                //creating a new post record in database
                const newPost = new Post({
                    userId,
                    postUrl: result.url,
                    firstname,
                    lastname,
                    imageUrl,
                    location,
                })

                //saving the record
                const ans = await newPost.save();
                res.status(201).send({ "status": "success", "message": ans, color: "green" })
            }
        }
        catch (error) {
            res.send({ "status": "failed", "message": error, color: "red" })
        }
    })
}
export const createPost = async (req, res, next) => {

    //

    //postUrl inside file

    const file = req.files;
    const { description, firstname, lastname, imageUrl, location, userId } = req.body

    console.log(req.body)
    if (file || description) {
        if (file && description) {
            funct(1, req, res)
        } else if (file) {
            funct(2, req, res)
        } else if (description) {
            const newPost = new Post({
                userId,
                description,
                firstname,
                lastname,
                imageUrl,
                location,
            })
            const ans = await newPost.save()
            res.status(201).send({ "status": "success", "message": ans, color: "red" })
        }


    } else return res.send({ "status": "failed", "message": "No file or description", color: "red" })
}

//Delete post
export const deletePost = async (req, res, next) => {
    console.log('Hi')
    try {
        cloudinary.config({
            cloud_name: "der99pbsq",
            api_key: "214811345337694",
            api_secret: "4mJ4mx_iEnNgPk_yBLg1Gk85v4E"
        });

        const { id } = req.body;
        if (req.body.postUrl) {
            const { postUrl } = req.body
            console.log(id, postUrl)
            const urlArray = postUrl.split('/')
            const image = urlArray[urlArray.length - 1]

            const imageName = image.split('.')[0];

            await cloudinary.uploader.destroy(imageName, (error, result) => {
                console.log(error, result)
            })
        }
        const post = await Post.deleteOne({ _id: id })
        res.send({ "status": "success", "message": "User post deleted", deletedPost: post })
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
