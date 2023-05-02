import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { createError } from "../utils/createError.js"
export const register = async (req, res, next) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 5)
        const newUser = new User({
            ...req.body,
            password: hash,

        })
        await newUser.save()
        res.status(201).send('User has been created')
    } catch (err) {
        next(err)
    }
}
export const login = async (req, res, next) => {
    try {
        console.log('Hi')
        const user = await User.findOne({ username: req.body.username });
        //console.log(req.body.username, req.body.Password)
        //console.log(user)

        if (!user) return next(createError(404, "User not found"))
        // console.log(user)
        const isCorrect = bcrypt.compareSync(req.body.Password, user.password);
        //console.log(isCorrect)
        if (!isCorrect)
            return next(createError(400, "Wrong password or username"))

        const token = jwt.sign({
            id: user._id,
            isSeller: user.isSeller
        }, process.env.JWT_KEY)
        //console.log(token)
        const { password, ...info } = user._doc
        res.cookie("accessToken", token, {
            httpOnly: true
        }).status(200).send(info)

    } catch (error) {
        next(error)
    }
}
export const logout = async (req, res) => {
    res.clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
    }).status(200).send('User has been logged out.')
}