import React, { useState, useEffect, useRef } from 'react'
import "./messanger.css"
import NavbarPc from '../navbars/NavbarPc'
import Conversation from '../conversations/Conversation'
import Message from '../message/Message'
import ChatOnline from '../chatOnline/ChatOnline'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { io } from "socket.io-client"
const Messanger = () => {
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setmessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [onlineUsers, setOnlineUsers] = useState([])
    const socket = useRef()
    const obj = useSelector(state => state.counterSliceReducer)
    const scrollRef = useRef()

    useEffect(() => {
        socket.current = io("ws://localhost:8900")

    }, [])

    useEffect(() => {
        socket.current.on("getMessage", data => {
            //console.log(data)
            setmessages(prev => [...prev, data])
        })
    }, [messages])



    useEffect(() => {
        socket.current.emit("addUser", obj.user.id)
        socket.current.on("getUsers", users => {
            setOnlineUsers(users)
        })
    }, [obj.user])




    useEffect(() => {
        const getConversations = async () => {

            try {
                const res = await axios.get("http://localhost:5000/api/conversations/" + obj.user.id)
                setConversations(res.data)
                //console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
        getConversations()
    }, [])
    //console.log(currentChat)
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/messages/` + currentChat?._id)
                setmessages(res.data)
            } catch (error) {
                console.log(error)
            }

        }
        getMessages()
    }, [currentChat])
    //console.log(currentChat)
    //console.log(messages)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: obj.user.id,
            text: newMessage,
            conversationId: currentChat._id,

        }
        const receiverId = currentChat.members.find(member => member !== obj.user.id)
        socket.current.emit("sendMessage", {
            senderId: obj.user.id,
            receiverId,
            text: newMessage
        })
        try {
            const res = await axios.post("http://localhost:5000/api/messages", message)
            setmessages([...messages, res.data])
            setNewMessage("")
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <>
            <NavbarPc />
            <div className='messanger'>
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" placeholder='Search for friends' className='chatMenuInput' />
                        {
                            conversations?.map((c, id) => (
                                <div key={id} onClick={() => setCurrentChat
                                    (c)}>
                                    <Conversation conversation={c} currentUser={obj.user} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ? <>
                                <div className="chatBoxTop">
                                    {
                                        messages?.map((m, id) => (
                                            <div ref={scrollRef} key={id}>
                                                <Message message={m} own={m.sender === obj.user.id} />
                                            </div>
                                        ))
                                    }

                                </div>
                                <div className="chatBoxBottom">
                                    <textarea className='chatMessageInput' placeholder='write something ...' onChange={(e) =>
                                        setNewMessage(e.target.value)
                                    }
                                        value={newMessage}
                                    ></textarea>
                                    <button className='chatSubmitButton'
                                        onClick={handleSubmit}
                                    >Send</button>
                                </div></>
                                :
                                <span className='noConversationText'>Open a conversation to start a chat.</span>
                        }
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline
                            onlineUsers={onlineUsers}
                            currentId={obj.user.id}
                            setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messanger