import React, { useState, Fragment, useRef, useEffect, useContext } from 'react'
import { styled, Box, Avatar, Typography } from '@mui/material'
import { AccountContext } from 'context/AccountProvider.jsx';
import pic1 from "images/dp.jpg"
import SendIcon from '@mui/icons-material/Send';
//for heading

import { useDispatch, useSelector } from 'react-redux';
import { newConversation } from "../../../../api/conversationAuth.js"
import { getMessages, newMessage } from 'api/messageAuth';
import { changeConvoId, changeSetActiveUsers } from 'counter/CounterSlice.js';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { io } from "socket.io-client";
import { format } from "timeago.js"

const Header = ({ pM }) => {
    const obj = useSelector(state => state.counterSliceReducer)
    //console.log(obj)
    return (
        <Fragment>
            <div className='Photo h-[100%] w-[15%] box-border justify-center items-center flex' > <Avatar src={pM.imageUrl} sx={{
                height: 50,
                width: 50
            }}></Avatar></div>
            <div className='Name flex flex-col items-center p-2 box-border '>
                <p className='text-[0.9rem] font-bold'>{pM.name}</p>
                <p className='text-[0.8rem]'>
                    {
                        obj.activeusers && obj.activeusers.find(user => user.id === pM.id) ? <><FiberManualRecordIcon className='text-[green]' sx={{
                            height: '15px',
                            width: '15px'
                        }} /> Online</> : <><FiberManualRecordIcon className='text-[red]' sx={{
                            height: '15px',
                            width: '15px'
                        }} />Offline</>
                    }
                </p>

            </div>
        </Fragment>
    )
}
const Heading = ({ switchSearch }) => {
    const obj = useSelector(state => state.counterSliceReducer)
    const pM = obj.presentMessagePerson
    //console.log(pM)
    return (
        <div className='Heading w-[100%] box-border  h-[10%] flex flex-row bg-[grey]'>
            {pM && <Header pM={pM} switchSearch={switchSearch} />
            }
        </div>
    )
}
//messages
const Own = styled(Box)`
  background: #3477eb;
  max-width:70%;
  margin-left:auto;
  padding:10px;
  margin-bottom:10px;
  width:fit-content;
  color:white;
  font-size:0.8rem;
  display:flex;
  border-radius:10px;
  word-break:break-word;
`
const Wrapper = styled(Box)`
   
    max-width: 70%;
    margin-right:auto;
    font-size:0.8rem;
   
    margin-bottom:10px;
    width:fit-content;
    display:flex;
  
    word-break:break-word;
   display:flex;
   flex-direction:column;
     
`
const Time = styled(Typography)`
    font-size: 10px;
    font-weight:bold;

    
    margin-top:6px;
    word-break: keep-all;
    margin-top:auto;
`
const PartTwo = ({ setConvoId, switchSearch, messages, setenterPress, enterPress, setMessages/* , incomingMessage */, socket, onlineUsers }) => {


    const obj = useSelector(state => state.counterSliceReducer)
    const mode = obj.mode
    const [desc, setDesc] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const dispatch = useDispatch()


    const handleMessage = async (e) => {
        //if message text is empty
        if (desc === "") return
        e.preventDefault();
        //new conversation created in database on sending first message
        const convo = await newConversation({
            senderId: obj.user.id,
            receiverId: obj.presentMessagePerson.id
        })
        //console.log(obj.presentMessagePerson._id)
        //console.log(convo)

        dispatch(changeConvoId({ id: convo.data._id }))
        let message = {
            senderId: obj.user.id,
            receiverId: obj.presentMessagePerson.id,
            conversationId: convo.data._id,
            type: 'text',
            text: desc
        }

        setDesc("")
        const res = await newMessage(message, obj.token)
        //for instant displaying of message sent by sender in inbox
        //console.log(res)
        //flag to update sender message on sender side
        setenterPress(prev => !prev)

        socket.current.emit("sendMessage", message)


    }

    const messageRef = useRef()
    useEffect(() => {
        function updateScroll() {

            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
        updateScroll();
    }, [messages])




    return (
        <div className='mt-[12vh]  w-[450px] border-box '>

            <Heading switchSearch={switchSearch} />
            <div className={`Messages   overflow-y-scroll w-[100%] box-border h-[75%] p-2 flex flex-col ${obj.mode === 'dark' ? 'bg-[#27272a]' : 'bg-[#dadada]'}`} ref={messageRef}>
                {
                    messages && messages.map((m, id) => (



                        m.senderId === obj.user.id ?
                            <div className=' box-border flex flex-col  items-end' key={id}>

                                <Own >
                                    {
                                        m.text
                                    }

                                </Own>
                                <Time className={`${obj.mode === 'light' ? "text-[black]" : "text-[white]"}`}>
                                    {format(m.createdAt)}
                                </Time>
                            </div>
                            :
                            <div className=' box-border flex flex-row' key={id}>
                                <Avatar src={obj.presentMessagePerson.imageUrl} className="mr-2" />
                                <Wrapper>
                                    <div className='bg-[grey] rounded-[10px]  p-[10px] mb-2'>
                                        {
                                            m.text
                                        }

                                    </div>
                                    <Time className={`${obj.mode === 'light' ? "text-[black]" : "text-[white]"}`}>
                                        {format(m.createdAt)}
                                    </Time>
                                </Wrapper>
                            </div>

                    ))



                }






            </div >
            <div className='Search w-[100%] box-border h-[15%] flex  items-center'>

                <textarea className={` h-[100%] text-[black] w-[95%] bg-[#808080] placeholder-[black] pt-5 pl-5 resize-none text-[0.9rem] focus:outline-none`} placeholder="What's on your mind?...." name="description" onChange={e => {
                    e.preventDefault()
                    setDesc(e.target.value)
                }}
                    value={desc}
                />
                <div className='w-[10%] h-[100%] flex justify-center items-center bg-[#808080] '>
                    <div className='rounded-full p-2 cursor-pointer hover:bg-[#d0d0d0]' onClick={handleMessage}>
                        <SendIcon />
                    </div>
                </div>

            </div>

        </div >
    )
}

export default PartTwo