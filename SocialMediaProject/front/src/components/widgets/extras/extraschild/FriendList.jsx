import { useState, Fragment, useEffect } from 'react'

import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useMediaQuery } from "@mui/material"

import { addFriend } from 'counter/CounterSlice';
//import Pic1 from "images/dp.jpg"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import "../../../../styles/CommonStyle.css"
import { getUserData, handleFriendRequest } from 'api/userAuth';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';


const Friend = ({ profileData }) => {
  const obj = useSelector(state => state.counterSliceReducer)
  const mode = obj.mode
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //Add friend Request
  const p = useParams()
  const handleRequest = async (e, userId) => {
    dispatch(addFriend({ id: userId }))
    handleFriendRequest(e, userId, obj, p);
  }
  // console.log(profileData)
  //api logic to friend information from friends' id stored in local storage
  const keys = p.id === obj.user.id ? Object.keys(obj.user.friends) : profileData && Object.keys(profileData?.friends)
  const [friendcount, setFriendcount] = useState([])
  const fetchDetails = async () => {
    try {
      const responses = await Promise.all(
        keys && keys?.map(async key => (
          await getUserData({ id: key })
        ))
      )
      let arr = [];
      responses.map((data) => (
        arr.push(data.data.user)
      ))
      setFriendcount(arr)
    } catch (error) {
      // /console.log(error)
    }
  }
  useEffect(() => {
    fetchDetails()
  }, [obj.user, profileData])
  const handleNavigate = (e, userId) => {
    e.preventDefault();

    navigate(`/profile/${userId}`)

  }


  return (
    <Fragment>
      {friendcount.length > 0 ? friendcount.map(({ userId, firstname, lastname, imageUrl, occupation }, id) => (
        <div key={id} className={`box-border  h-[8vh] flex flex-row ${mode === "light" ? "" : "bg-[#373737] text-[white]"} rounded-md`}>

          <div className="Image h-full w-[15%] box-border flex justify-center items-center pl-[0.5rem]">
            <div className="" onClick={(e) => handleNavigate(e, userId)}>
              <img src={imageUrl} alt="DP" className="h-[2rem] w-[2rem] rounded-full cursor-pointer" />

            </div>
          </div>
          <div className="Details h-full w-[70%] flex flex-col justify-center pl-[0.8rem]">
            <p className="text-[0.9rem] font-bold" onClick={(e) => handleNavigate(e, userId)}>{firstname} {lastname}</p>
            <p className="text-[0.8rem] font-semibold" onClick={(e) => handleNavigate(e, userId)}>{occupation}</p>
          </div>
          <div className="AddFriend h-full w-[15%] box-border  flex justify-start items-center">
            {p.id === obj.user.id ?
              <div className="box-border  rounded-full p-[0.4rem] bg-[#b1efff] cursor-pointer  shadow-xl" onClick={(e) => {
                handleRequest(e, userId)
              }}>
                {
                  obj.user.friends[userId] ? <HowToRegOutlinedIcon className="text-[#1d6feb] hover:h-[1.8rem] hover:w-[1.8rem]" /> : <PersonAddAltIcon className="text-[#1d6feb] hover:h-[1.8rem] hover:w-[1.8rem]" />
                }</div>
              : <></>
            }
          </div>
        </div>
      )) :
        <div className={`box-border  h-[8vh] flex flex-row items-center justify-center ${mode === "light" ? "" : "bg-[#373737] text-[white]"} rounded-md`}>
          <CircularProgress color="success" />

        </div>
      }

    </Fragment>
  )
}



const FriendList = ({ profileData }) => {
  const obj = useSelector(state => state.counterSliceReducer)
  const mode = obj.mode
  const isNonMobileScreens = useMediaQuery('min-width:1000px')
  const lowestScreens = useMediaQuery('min-width:430px;max-width:1000px')
  return (
    <div className={`Friend-List temp temp2 temp3 ${mode === "light" ? "bg-[white]" : "text-[white] bg-[#373737]"}   mt-[2rem] min-h-[5vh] box-border  text-[0.9rem] mb-[2rem] `}>
      <div className='Friend-Heading box-border h-[4.9vh] flex items-center ml-[1rem] font-semibold'>Friend List</div>
      <div className='bg-[grey] h-[0.1vh] '></div>
      <Friend profileData={profileData} />
    </div>
  )
}

export default FriendList