import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { changeAlertMessages } from 'counter/CounterSlice';


const SendMessage = ({ messages, setMessages }) => {

    const obj = useSelector(state => state.counterSliceReducer)
    const [desc, setDesc] = useState("")
    const { id: convoId } = useParams()
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (desc === "") return;


        let message = {
            conversationId: convoId,
            sender: obj.user.id,
            text: desc,
            receiver: obj.presentMessagePerson.userId,
            readByReceiver: false
        }
        dispatch(changeAlertMessages())
        setDesc("")
        setMessages(prev => [...prev, message])
        try {
            const res = await axios({
                url: 'http://localhost:5000/message/add',
                method: 'POST',
                data: message,
                headers: {
                    'authorization': `Bearer ${obj.token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className='Search w-[100%] box-border h-[17%] flex  items-center'>

            <textarea className={` h-[100%] text-[black] w-[95%] bg-[#808080] placeholder-[black] pt-5 pl-5 resize-none text-[0.9rem] focus:outline-none`} placeholder="Send Your Message..." name="description" onChange={e => {
                e.preventDefault()
                setDesc(e.target.value)
            }}
                value={desc}
            />
            <div className='w-[10%] h-[100%] flex justify-center items-center bg-[#808080] '>
                <div className='rounded-full p-2 cursor-pointer hover:bg-[#d0d0d0]' onClick={handleSubmit}>
                    <SendIcon />
                </div>
            </div>

        </div>
    )
}

export default SendMessage