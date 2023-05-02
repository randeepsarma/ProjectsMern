import React, { useState, useEffect } from 'react'
import "./conversation.css"
import pic1 from "../../../images/dp.jpg"
import axios from 'axios'
const Conversation = ({ conversation, currentUser }) => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser.id)
        const getUser = async () => {
            const response = await axios.get(`http://localhost:5000/user/findwithid/${friendId}`)
            setUser(response.data.user)
            //console.log(response.data.user)
        }
        getUser()
    }, [conversation, currentUser])
    //console.log(user)

    return (
        <div className='conversation'>
            <img className="conversationImg" src={user?.imageUrl} alt="" />
            <span className="conversationName">
                {user?.firstname} {user?.lastname}
            </span>
        </div>
    )
}

export default Conversation