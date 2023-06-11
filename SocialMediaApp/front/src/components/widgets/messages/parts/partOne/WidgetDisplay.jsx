import { Avatar } from '@mui/material'
import React, { useEffect } from 'react'

import axios from 'axios'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { month } from 'utils/newRequest';
import { changePerson } from 'counter/CounterSlice';
import { getUserData } from 'api/userAuth';
const WidgetDisplay = ({ item, handleClick, convo, setSearching, searching }) => {
    //console.log(item)
    const obj = useSelector(state => state.counterSliceReducer)
    const [user, setUser] = useState({})
    let newDate = new Date(item.updatedAt)
    let arr = newDate.toString().split(" ")
    const findId = item.members.filter(item => item !== obj.user.id)[0]
    const dispatch = useDispatch()
    const { id: convoId } = useParams()
    useEffect(() => {

        dispatch(changePerson(user))

    }, [(convoId === item._id && user)])

    //console.log(findId, loggedId)
    useEffect(() => {
        const fetchData = async () => {

            const res = await getUserData({id:findId})
            setUser(res.data.user)
        }

        fetchData()
    }, [item, findId])


    return (
        <div className={`w-[100%] h-[84px] flex justify-center  items-center  flex-row  border-b-[1px]  hover:bg-[#6b6b6b] cursor-pointer ${convoId === item._id ? "bg-[rgba(91,91,122,0.5)]" : ""} ${obj.mode === 'dark' ? "text-[white] border-[white]" : "text-[black] border-[black]"}`} onClick={(e) => handleClick(e, findId, user, item._id)}>
            <div className={`h-[100%] w-[2%] bg-[#00c3ff] ${convoId === item._id ? "" : "invisible"}`}></div>
            <div className="one h-[100%] w-[18%] box-border  flex justify-center pt-4">
                {user ? <img src={user?.imageUrl} className='h-[30px] w-[30px] rounded-[50%] ml-[1px]' alt="dp" /> : <CircularProgress />}
            </div>
            <div className="two h-[100%] w-[55%] box-border  text-[13px] flex flex-col">
                <div className="partName box-border  h-[40%] flex items-end pl-2 font-bold">{user?.firstname} {user?.lastname}</div>
                <div className="partName box-border  h-[60%] text-[12px] pt-2 pl-2">{item?.lastmessage}</div>

            </div>
            <div className="three flex h-[100%] w-[25%] box-border  text-[11px] justify-center items-center">
                {arr[2] + "/" + month[arr[1]] + "/" + arr[3]}
            </div>
        </div>
    )
}

export default WidgetDisplay
