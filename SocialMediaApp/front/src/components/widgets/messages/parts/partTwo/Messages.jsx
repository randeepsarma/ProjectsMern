import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from './Message'


import axios from 'axios';

import LinearProgress from '@mui/material/LinearProgress';
import { socket } from 'App';
import { changeAlertMessages, changeMessages, changeMessagesManual } from 'counter/CounterSlice';
import Pusher from 'pusher-js'
import { changeRead, getMessages } from 'api/messageAuth';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
const Messages = ({ messages, setMessages, searching, setSearching, }) => {
    const obj = useSelector(state => state.counterSliceReducer)

    const { id: convoId } = useParams()
    //console.log(messages)
    //get all messages
    useEffect(() => {

        const funct = async () => {
            const res = await getMessages(convoId, obj.token);
            //console.log(res)
            setMessages(res.data);
            setSearching(false)
        }
        if (convoId !== obj.user.id)
            funct()
        //this useEffect runs regardless of whether the present persons inbox is active or not
    }, [convoId])

    // 👇️ scroll to bottom every time messages change
    const messageRef = useRef()
    useEffect(() => {

        messageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    const dispatch = useDispatch()
   
    //getting live message
    useEffect(() => {
        const pusher = new Pusher('b4714209ae2fb62c0dd3', {
            cluster: 'ap2',
            useTLS: true,
        });
        const channel = pusher.subscribe('messages-'+obj.user.id);
        channel.bind('inserted', function (data) {
            
            //update message reads
        console.log(obj.user)

            data.readByreceiver = true

            setMessages(prev => [...prev, data])
        });
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }
    }, [])
    //console.log(messages)
    return (
        <div className={`Messages   overflow-y-scroll w-[100%] box-border h-[73%] p-2 flex flex-col ${searching ? " items-center justify-center" : ""} ${obj.mode === 'dark' ? 'rgba(25,25,45)' : 'bg-[#e2e2e2]'}`}  >{
            !searching ?
                <>
                    {
                        messages?.map((item, id) => (
                            <Message item={item} key={id} />
                        ))
                    }
                    <div ref={messageRef} />
                </> : <CircularProgress color="success" className='h-[50%] w-[50%]' />

        }
        </div >
    )
}

export default Messages