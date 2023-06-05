
import User from "../models/User.js";
import { v2 as cloudinary } from 'cloudinary'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import MessageModel from "../models/Message.model.js";

export const register = async (req, res, next) => {

    cloudinary.config({
        cloud_name: "der99pbsq",
        api_key: "214811345337694",
        api_secret: "4mJ4mx_iEnNgPk_yBLg1Gk85v4E"
    });
    const file = req.files.photo;


    //console.log(file)

    //returning that user exists in database before uploading the file
    const { firstname, lastname, location, occupation, email, password } = req.body;

    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
        return res.send({ "status": "failed", "message": "Email already exists" })
    }
    //uploading files 
    cloudinary.uploader.upload(file.tempFilePath, { folder: "Social_Media_dp" },
        async (err, result) => {
            try {
                if (firstname && lastname && location && occupation && file && email && password) {
                    //hashing password
                    const salt = await bcrypt.genSalt(10);
                    const hash = await bcrypt.hash(password, salt);
                    //creating a new record in database
                    const newUser = new User({
                        firstname,
                        lastname,
                        location,
                        occupation,
                        imageUrl: result.url,
                        email,
                        password: hash
                    })
                    //saving the record
                    const ans = await newUser.save();

                    res.status(201).send({ "status": "success", "message": "Registration Success" })

                } else {
                    res.send({ "status": "failed", "message": "All fields are required" })

                }
            } catch (error) {
                res.send({ "status": "failed", "message": error })
            }
        })
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // console.log(req.body)
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
    cloudinary.config({
        cloud_name: "der99pbsq",
        api_key: "214811345337694",
        api_secret: "4mJ4mx_iEnNgPk_yBLg1Gk85v4E"
    });

    //returning that user exists in database before uploading the file
    const { firstname, lastname, location, occupation, email, password } = req.body;

    const checkUser = await User.findOne({ email: email }).select('+password');;

    let file;
    let newData = {
        firstname: checkUser.firstname,
        lastname: checkUser.lastname,
        location: checkUser.location,
        occupation: checkUser.occupation,
        email: checkUser.email,
        password: checkUser.password,
        imageUrl: checkUser.imageUrl,
    }
    if (firstname) {
        newData['firstname'] = firstname[0].toUpperCase() + firstname.slice(1).toLowerCase()
    }
    if (lastname) {
        newData['lastname'] = lastname[0].toUpperCase() + lastname.slice(1).toLowerCase()
    }
    if (location) {
        newData['location'] = location[0].toUpperCase() + location.slice(1).toLowerCase()
    }
    if (occupation) {
        newData['occupation'] = occupation[0].toUpperCase() + occupation.slice(1).toLowerCase()
    }

    if (email) {
        newData['email'] = email
    }
    if (password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        newData['password'] = hash
    }
    // console.log(checkUser)
    if (req.files) {
        const { imageUrl } = checkUser;
        const urlArray = imageUrl.split('/')
        const image = urlArray[urlArray.length - 2] + "/" + urlArray[urlArray.length - 1]
        //console.log(imageUrl)
        const imageName = image.split('.')[0];
        await cloudinary.uploader.destroy(imageName, (error, result) => {
            //console.log(error, result)
        })
        file = req.files.photo;

        cloudinary.uploader.upload(file.tempFilePath, { folder: "Social_Media_dp" },
            async (err, result) => {
                try {
                    //console.log(result.url)
                    newData.imageUrl = result.url
                    //console.log(newData)

                    const newUserData = await User.findByIdAndUpdate(checkUser._id, newData)

                    return res.status(200).send(newUserData)
                } catch (error) {
                    res.send({ "status": "failed", "message": error })
                }
            })
    } else {
        const newUserData = await User.findByIdAndUpdate(checkUser._id, newData)

        return res.status(200).send(newUserData)
        //uploading files 
    }
}