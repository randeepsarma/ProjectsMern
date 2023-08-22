"use client"
import React, { useEffect, useState } from 'react'
import styles from "../../styles/profileEdit.module.css"
import dp from "../../images/cristiano_ronaldo.jpg"
import { useMediaQuery } from '@mui/material'
import Image from 'next/image'
import {AiFillEdit} from "react-icons/ai"
import {GoPersonFill} from "react-icons/go"

const ProfileEdit = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:900px)")
  const isMidScreens = useMediaQuery("(min-width:450px)")
  const [userInfo, setuserInfo] = useState({});

  useEffect(() => {
    setuserInfo(JSON.parse(localStorage.getItem("user")));
  }, [typeof window !== "undefined"]);
  //console.log(userInfo)
  return (
    <div className={` ${isNonMobileScreens?"w-[40%]":"w-[100%]"} mt-[10px]
   
    `}>
        <div className='w-[100%] flex justify-center'>
          {  
 <img src={userInfo?.img} alt="DP"
           width={100} height={100}
           className='rounded-full  box-border border-2 border-[grey]' />}
        </div>
        <p className='mx-[20px] flex justify-between text-[18px] mt-[10px] items-center border-2 rounded-l-[15px] rounded-r-[15px] bg-[white] border-[grey]'><span className='ml-4'>{userInfo.name}</span><AiFillEdit className='cursor-pointer hover:bg-[#69edff] text-[30px] p-[2px] mr-4'/>
        </p>
        <p className='mx-[20px] flex justify-between text-[18px] mt-[10px] items-center border-2 rounded-l-[15px] rounded-r-[15px] bg-[white] border-[grey]'><span className='ml-4'>{userInfo.email}</span><AiFillEdit className='cursor-pointer hover:bg-[#69edff] text-[30px] p-[2px] mr-4'/>
        </p>
        
        

    </div>
  )
}

export default ProfileEdit