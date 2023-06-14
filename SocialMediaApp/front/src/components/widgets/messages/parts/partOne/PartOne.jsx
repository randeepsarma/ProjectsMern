import React, { useState, useEffect } from 'react'
import { CircularProgress, useMediaQuery } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux'
import { changePerson } from 'counter/CounterSlice'

import Search from './Search'

import axios from 'axios'
import WidgetDisplay from './WidgetDisplay'
import { useNavigate } from 'react-router-dom';
import { getAllConversations } from 'api/conversationAuth';

const PartOne = ({ messages, setSearching, searching }) => {
    const obj = useSelector(state => state.counterSliceReducer)
    const [text, setText] = useState('')
    const [conversations, setConversations] = useState(null)
    useEffect(() => {
        //console.log('hi')
        const fetchConvo = async () => {
            const res = await getAllConversations(obj.user)

            setConversations(res.data);
        }

        fetchConvo()
    }, [, messages, obj.user?.id, obj.alertMessages])

    /* 
    useEffect(() => {
        const fetchData = async () => {
            let response = await getUsers()
            const filteredData = response.filter(user => user.name.toLowerCase().includes(text.toLowerCase()))
            setUsers(filteredData)
        }
        fetchData()
    }, [text]) */


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleClick = (e, findid, user, convoId) => {
        e.preventDefault();
        setSearching(true)

        dispatch(changePerson(user))
        //console.log(user.userId, user.firstname)
        navigate(`/message/${convoId}`)
    }
    const isNonConsiderable = useMediaQuery("(min-width:770px)")
    return (
        <div className={` overflow-y-scroll ${!isNonConsiderable ? "" : "rounded-tl-[15px]"} w-[350px] border-box ${obj.mode === 'dark' ? 'bg-[rgb(25,25,45)] ' : 'bg-[#dadada] text-[black]'}`}>
            <Search setText={setText} text={text} />
            {
                conversations?.map((item) => (
                    <WidgetDisplay item={item} key={item._id} handleClick={handleClick} searching={searching} setSearching={setSearching} />
                ))
            }
            {
                !conversations &&
                <div className={`w-[100%] h-[84px] flex justify-center font-bold items-center  flex-row  border-b-[1px]  hover:bg-[#6b6b6b] cursor-pointer ${obj.mode === 'dark' ? "text-[white] border-[white]" : "text-[black] border-[black]"}`} >
                    <CircularProgress />
                </div>
            }

        </div>
    )
}

export default PartOne