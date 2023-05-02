import React, { Fragment, useEffect, useState, useRef, useContext } from 'react'
import PartOne from './parts/PartOne'
import PartTwo from './parts/PartTwo'
import { getAllConversations, getConversation } from 'api/conversationAuth'
import { useDispatch, useSelector } from 'react-redux'
import socketIo from 'socket.io-client'
import { getMessages } from 'api/messageAuth'
import { changeSetActiveUsers } from 'counter/CounterSlice'
import AccountProvider, { AccountContext } from 'context/AccountProvider'
import { io } from "socket.io-client"


//const ENDPOINT = "http://localhost:5000"
//let socket;
const MessageBox = () => {
    const dispatch = useDispatch()

    const obj = useSelector(state => state.counterSliceReducer)
    const [messages, setMessages] = useState([])

    const socket = useRef()
    const [incoming, setIncoming] = useState(null)

    useEffect(() => {
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage", data => {
            setIncoming({
                receiverId: data.receiverId,
                senderId: data.senderId,
                type: data.type,
                text: data.text,
                createdAt: Date.now(),
                conversationId: data.conversationId
            })
            //console.log(data)
        })
    }, [])
    useEffect(() => {
        incoming && setMessages((messages) => [...messages, incoming])

    }, [incoming, obj.presentMessagePerson])

    console.log(messages)
    const [onlineUsers, setOnlineUsers] = useState([])

    useEffect(() => {
        socket.current.emit("addUser", obj.user.id)
        socket.current.on("getUsers", users => {
            setOnlineUsers(users)
        })
    }, [])

    /* useEffect(() => {
       
    }, [messages])

 */


    const [convoId, setConvoId] = useState(null)

    const [conversations, setconversations] = useState()
    const [switchSearch, setswitchSearch] = useState(false)










    //latest messages
    const [enterPress, setenterPress] = useState(false)

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await getMessages(obj.convoId)
            setMessages(response.data)
            //console.log(messages)
        }

        fetchMessages()

    }, [enterPress, obj.convoId])

    //getting present active conversation from database

    /*  useEffect(() => {
         const getConversationDetails = async () => {
             let res = await getConversation({
                 senderId: obj.user.id,
                 receiverId: obj.presentMessagePerson.id
             })
             //console.log(res.data)
             setConversation(res.data)
         }
 
 
         getConversationDetails();
 
     }, [obj.presentMessagePerson]) */


    //console.log(messages)


    /*  useEffect(() => {
         socket.on('getMessage', (data) => {
             console.log(data)
             //setMessages([...messages, data])
         })
 
          return () => {
             socket.off()
         } 
     }, [messages]) */




    useEffect(() => {
        const fetchData = async () => {
            const res = await getAllConversations({
                senderId: obj.user.id
            })
            //console.log(res)

            setconversations(res.data)
        }

        fetchData()
    }, [, !switchSearch, enterPress, messages])
    // console.log(conversations)

    //console.log(incomingMessage)
    return (

        <div className={`MessageBox w-screen h-[100vh] flex flex-row justify-center ${obj.mode === 'dark' ? 'bg-[black]' : 'bg-[#27272a]'}`}>
            <PartOne convoId={convoId} conversations={conversations} switchSearch={switchSearch}
                setswitchSearch={setswitchSearch}
            />
            {
                obj.convoId && <PartTwo enterPress={enterPress} setenterPress={setenterPress} messages={messages} setConvoId={setConvoId} switchSearch={switchSearch} setMessages={setMessages} /* incomingMessage={incomingMessage} */ socket={socket} onlineUsers={onlineUsers} />

            }
            {
                !obj.convoId && (
                    <div className={`mt-[12vh]  w-[55%] border-box flex justify-center items-center border-2 border-[grey] ${obj.mode === 'dark' ? "text-[white]" : ""}`}>
                        Start Messaging
                    </div>
                )
            }
        </div>

    )
}

export default MessageBox