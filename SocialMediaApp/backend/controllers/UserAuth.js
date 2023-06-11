
import User from "../models/User.js";
import { v2 as cloudinary } from 'cloudinary'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import MessageModel from "../models/Message.model.js";
import { destroyImage } from "../utils/functions.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export const register = async (req, res, next) => {
    

    //returning that user exists in database before uploading the file
    const { firstname, lastname, location, occupation, email, password,imageUrl } = req.body;
    //console.log(req.body)
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
        return res.send({ "status": "failed", "message": "Email already exists" })
    }
    //uploading files 
    
    try {
        if (firstname && lastname && location && occupation && email && password && imageUrl) {
            //hashing password
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            //creating a new record in database
            const newUser = new User({
                firstname,
                lastname,
                location,
                occupation,
                imageUrl,
                email,
                password: hash
            })
            //saving the record
            const ans = await newUser.save();

            res.status(201).send({ "status": "success", "message": "Registration Success" ,ans})

        } else {
            res.send({ "status": "failed", "message": "All fields are required" })

        }
    } catch (error) {
        res.send({ "status": "failed", "message": error })
    }
        
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
         console.log('Hey')
        //check  if both fields are present
        if (email && password) {
            const checkUser = await User.findOne({ email: email }).select('+password');

            //check if the user with the email exists
            if (checkUser) {
                const isMatch = await bcrypt.compare(password, checkUser.password);


                //check if password matches the database one
                if (isMatch) {
                    const token = jwt.sign({ userID: checkUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
                    let numOfUnread = await MessageModel.find({ receiver: checkUser._id, readByReceiver: false }).count()
                    //console.log(numOfUnread)
                    //console.log(ans) 
                    res.send({
                        "status": "success", "message": "Login Success", "token": token, user: {
                            id: checkUser._id,
                            firstname: checkUser.firstname,
                            lastname: checkUser.lastname,
                            location: checkUser.location,
                            occupation: checkUser.occupation,
                            imageUrl: checkUser.imageUrl,
                            email: checkUser.email,
                            friends: checkUser.friends,
                        }, numOfUnread
                    })
                } else {
                    res.send({ "status": "failed", "message": "Email or Password is not Valid" })
                }
            } else {
                res.send({ "status": "failed", "message": "You are not a Registered User" })
            }

        } else {
            res.send({ "status": "failed", "message": "All Fields are Required" })
        }

    } catch (error) {
        res.send({ "status": "failed", "message": "Unable to Login" })
    }

    //console.log(req.body)
}

export const findWithId = async (req, res, next) => {
    const { id } = req.params

    try {
        const user = await User.findOne({ _id: id })
        if (user) {
            res.send({
                "status": "success", "message": "User found", user: {
                    userId: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    imageUrl: user.imageUrl,
                    occupation: user.occupation,
                    friends: user.friends,
                    location: user.location
                }
            })
        } else {
            res.send({ "status": "failed", "message": "User not found" })
        }

    } catch (error) {
        res.send({ "status": "failed", "message": error })
    }
}


export const makeFriends = async (req, res, next) => {

    try {
        const { userId, friendId } = req.params;
        /* console.log(req.params)
        console.log(userId,friendId) */
        const user = await User.findById(userId);
        const friend = await User.findById(friendId)

        const checkfriend = user.friends.get(friendId)
        const checkuser = friend.friends.get(userId)
        //console.log(user.friends.get(friendId),friend.friends.get(userId))
        if (checkfriend && checkuser) {
            user.friends.delete(friendId);
            friend.friends.delete(userId);

        } else {
            user.friends.set(friendId, true);
            friend.friends.set(userId, true);


        }
        const newUser = await User.findByIdAndUpdate(userId, { friends: user.friends })
        const newFriend = await User.findByIdAndUpdate(friendId, { friends: friend.friends })

        res.send({ "status": "Success", "message": "Friend Operation Performed", user: newUser, friend: newFriend })
    } catch (error) {
        res.send({ status: "failed", message: error })

    }
}

export const updateProfile = async (req, res, next) => {
    //configuration


    //returning that user exists in database before uploading the file
    const {num,userId,val} = req.body;


    let checkUser;
 
    if (num==='0') {
      //console.log(num)
        checkUser = await User.findByIdAndUpdate(userId,{firstname:val[0].toUpperCase() + val.slice(1).toLowerCase()});

    }
    else if (num==='1') {
      
        checkUser = await User.findByIdAndUpdate(userId,{lastname:val[0].toUpperCase() + val.slice(1).toLowerCase()});
    }
    else if (num==='5') {
        
        checkUser = await User.findByIdAndUpdate(userId,{location:val[0].toUpperCase() + val.slice(1).toLowerCase()});
    }
    else if (num==='4') {
       
        checkUser = await User.findByIdAndUpdate(userId,{occupation:val[0].toUpperCase() + val.slice(1).toLowerCase()});
    }

    else if (num==='2') {
        checkUser = await User.findByIdAndUpdate(userId,{email:val});
    }
    else if (num==='3') {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(val, salt);
        checkUser = await User.findByIdAndUpdate(userId,{password:hash});
    }
    const newUser = await User.findById(userId)
    //console.log(newUser)
    return res.status(200).json(newUser)
    // console.log(checkUser)
    
       /*  const { imageUrl } = checkUser;
        const urlArray = imageUrl.split('/')
        const image = urlArray[urlArray.length - 2] + "/" + urlArray[urlArray.length - 1]
        //console.log(imageUrl)
        const imageName = image.split('.')[0];
        await cloudinary.uploader.destroy(imageName, (error, result) => {
            //console.log(error, result)
        })
        file = req.files.photo; */

        
}

export const endProfileImage =async(req,res,next)=>{
    const {OldImageUrl,NewImageUrl,userId} =req.body;
    try {
      await destroyImage(OldImageUrl)
      await User.findByIdAndUpdate(userId,{
        imageUrl:NewImageUrl
      })
      res.status(200).json("Profile Picture Updated")
    } catch (error) {
      res.json(error)
    }

}
export const deleteProfile =async(req,res,next)=>{
console.log(req.body.userId)
    try {
        //find all posts made by userId
        const posts = await Post.find({userId:req.body.userId})
        //delete all comments made by userId
        await Comment.deleteMany({userId:req.body.userId})
       for(let i=0;i<posts.length;i++){
            //delete all comments made in the posts of userId
            await Comment.deleteMany({postId:posts[i]._id})
            //delete the respective post
            await Post.deleteOne({_id:posts[i]._id})
        }
        //delete the user
        await User.deleteOne({_id:req.body.userId}) 
        res.json('Profile deleted')  
    } catch (error) {
        res.json(error)
    }
   
    
}
