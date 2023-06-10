import User from "../models/User.js";
import jwt from 'jsonwebtoken'

export const checkUserAuth = async (req, res, next) => {

    try {
        const { authorization } = req.headers;
        const checkstart = authorization.startsWith('Bearer');
        if (checkstart) {
            //Get token
            let token = authorization.split(" ")[1];

            //Verify token
            const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY)

            if (userID) {
                req.user = await User.findById(userID);
                //console.log(userID)
                next();
            } else {
                return res.send({ "status": "failed", "message": "User does not exist" })
            }

        } else {
            return res.send({ "status": "failed", "message": "Headers do not match" })
        }
    } catch (error) {
        res.send({ "status": "failed", "message": error })
    }
}