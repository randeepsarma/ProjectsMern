import React, { useEffect, useState, /* useRef, */ } from 'react'
import PartOne from './parts/partOne/PartOne'
import PartTwo from './parts/partTwo/PartTwo'

import { /* useDispatch, */ useSelector } from 'react-redux'
// import { getMessages } from 'api/messageAuth'
// import { changeSetActiveUsers } from 'counter/CounterSlice'
// import Pusher from 'pusher-js'
import { socket } from 'App'
import { useParams } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'
const MessageBox = () => {
    const [messages, setMessages] = useState([]);
    const obj = useSelector(state => state.counterSliceReducer)
    const [activeUsers, setActiveUsers] = useState([])

    const isNonConsiderable = useMediaQuery("(min-width:770px)")

    // useEffect(() => {
    //     socket.emit("addUser", obj.user.id);
    //     socket.on("getUsers", (users) => {

    //         setActiveUsers(
    //             Object.keys(obj.user.friends).filter((f) => users.some((u) => u.userId === f))
    //         );
    //     });
    // }, [obj.user]);
    const { id: convoId } = useParams()


    const [searching, setSearching] = useState(false)
    return (

        <div className={`MessageBox w-screen h-[88vh] flex flex-row justify-center ${obj.mode === 'dark' ? 'bg-[black]' : 'bg-[#27272a]'} pt-[1rem]`}>
            {!isNonConsiderable && convoId !== obj.user.id ? <></> :
                <PartOne
                    messages={messages}
                    setSearching={setSearching}
                    searching={searching}

                />}
            {!isNonConsiderable && convoId === obj.user.id ? <></> :
                <PartTwo messages={messages} setMessages={setMessages} searching={searching} setSearching={setSearching} activeUsers={activeUsers} />}
        </div>

    )
}

export default MessageBox