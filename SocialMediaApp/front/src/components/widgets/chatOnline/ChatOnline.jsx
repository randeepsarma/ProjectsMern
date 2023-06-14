import React, { useState, useEffect } from 'react'
import "./chatOnline.css"
import pic1 from "../../../images/dp.jpg"
import { useSelector } from 'react-redux'
const ChatOnline = ({ onlineUser, currentId, setCurrentChat }) => {
    const [friends, setFriends] = useState([])
    const [onlineFriends, setOnlineFriends] = useState([])

    const obj = useSelector(state => state.counterSliceReducer)

    useEffect(() => {
        setFriends(Object.keys(obj.user.friends))
    }, [, obj.user.friends])



    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src={pic1} alt="" />
                    <div className="chatOnlineBadge">

                    </div>
                </div>
                <span className="chatOnlineName">
                    John Doe
                </span>


            </div>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src={pic1} alt="" />
                    <div className="chatOnlineBadge">

                    </div>
                </div>
                <span className="chatOnlineName">
                    John Doe
                </span>


            </div>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src={pic1} alt="" />
                    <div className="chatOnlineBadge">

                    </div>
                </div>
                <span className="chatOnlineName">
                    John Doe
                </span>


            </div>
        </div>
    )
}

export default ChatOnline