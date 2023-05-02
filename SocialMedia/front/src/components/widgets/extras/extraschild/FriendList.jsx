import { useState, Fragment, useEffect } from 'react'
import { FiUserCheck, FiUserPlus } from "react-icons/fi"
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useMediaQuery } from "@mui/material"

import { addFriend } from 'counter/CounterSlice';
import Pic1 from "images/dp.jpg"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios';
import "../../../../styles/CommonStyle.css"
import { getUserData, handleFriendRequest } from 'api/userAuth';
import { useParams } from 'react-router-dom';
const Friend = () => {
  const obj = useSelector(state => state.counterSliceReducer)
  const mode = obj.mode
  const dispatch = useDispatch()

  //Add friend Request
  const p = useParams()
  const handleRequest = async (e, userId) => {
    dispatch(addFriend({ id: userId }))
    handleFriendRequest(e, userId, obj, p);
  }

  //api logic to friend information from friends' id stored in local storage
  const keys = Object.keys(obj.user.friends)
  const [friendcount, setFriendcount] = useState([])
  const fetchDetails = async () => {
    try {
      const responses = await Promise.all(
        keys.map(async key => (
          await getUserData({ id: key })
        ))
      )
      let arr = [];
      responses.map((data) => (
        arr.push(data.data.user)
      ))
      setFriendcount(arr)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchDetails()
  }, [obj.user.friends])

  return (
    <Fragment>
      {friendcount.map(({ userId, firstname, lastname, imageUrl, occupation }, id) => (
        <div key={id} className={`box-border  h-[8vh] flex flex-row ${mode === "light" ? "" : "bg-[#373737] text-[white]"} rounded-md`}>

          <div className="Image h-full w-[15%] box-border flex justify-center items-center pl-[0.5rem]">
            <div className="">
              <img src={imageUrl} alt="DP" className="h-[2rem] w-[2rem] rounded-full " />

            </div>
          </div>
          <div className="Details h-full w-[70%] flex flex-col justify-center pl-[0.8rem]">
            <p className="text-[0.9rem] font-bold">{firstname} {lastname}</p>
            <p className="text-[0.8rem] font-semibold">{occupation}</p>
          </div>
          <div className="AddFriend h-full w-[15%] box-border  flex justify-start items-center">
            <div className="box-border  rounded-full p-[0.4rem] bg-[#b1efff] cursor-pointer  shadow-xl" onClick={(e) => {
              handleRequest(e, userId)
            }}>
              {
                obj.user.friends[userId] ? <HowToRegOutlinedIcon className="text-[#1d6feb] hover:h-[1.8rem] hover:w-[1.8rem]" /> : <PersonAddAltIcon className="text-[#1d6feb] hover:h-[1.8rem] hover:w-[1.8rem]" />
              }</div>

          </div>
        </div>
      ))}
    </Fragment>
  )
}



const FriendList = () => {
  const obj = useSelector(state => state.counterSliceReducer)
  const mode = obj.mode
  const isNonMobileScreens = useMediaQuery('min-width:1000px')
  const lowestScreens = useMediaQuery('min-width:430px;max-width:1000px')
  return (
    <div className={`Friend-List temp temp2 temp3 ${mode === "light" ? "bg-[white]" : "text-[white] bg-[#373737]"}   mt-[2rem] min-h-[5vh] box-border  text-[0.9rem] mb-[2rem] `}>
      <div className='Friend-Heading box-border h-[4.9vh] flex items-center ml-[1rem] font-semibold'>Friend List</div>
      <div className='bg-[grey] h-[0.1vh] '></div>
      <Friend />
    </div>
  )
}

export default FriendList