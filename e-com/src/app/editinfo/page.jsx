"use client"

import React, { useEffect, useState } from "react";
const Page = () => {

  const [userInfo, setuserInfo] = useState({});

  useEffect(() => {
    setuserInfo(JSON.parse(localStorage.getItem("user")));
  }, [typeof window !== "undefined"]);
  return (
    <div className='h-[100vh] w-[100vw] bg-[white]'>
      <img src={userInfo.img} alt="" />
      <p>{userInfo?.name}</p>
      <p>{userInfo?.email}</p>
      <p>{userInfo?.createdAt}</p>
      <p>{userInfo?.desc}</p>
    </div>
  )
}

export default Page