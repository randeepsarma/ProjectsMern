import React, { Fragment, useState } from 'react'

import { useSelector } from 'react-redux'
import UserWidget from 'components/widgets/UserWidget.jsx'
import PostParent from 'components/widgets/posts/PostParent'
import Extras from 'components/widgets/extras/Extras.jsx'
import { useMediaQuery } from '@mui/material'

import { useDispatch } from 'react-redux'


const Feed = () => {
  const dispatch = useDispatch()
  //if local storage id != to above id then don't show createpost  
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")

  //global state for token and mode
  const obj = useSelector(state => state.counterSliceReducer)

  const mode = obj.mode


  return (
    <Fragment>
      <div className={`${isNonMobileScreens ? `Home flex flex-row tracking-wide border-box  min-h-screen w-full ${mode === 'light' ? "bg-[#6b6b6b]" : "bg-[black]"}` : `Home flex flex-col h-full w-full ${mode === 'light' ? "bg-[#6b6b6b]" : "bg-[black]"}`}`}>
        <div className={`${isNonMobileScreens ? "UserWidget flex flex-col w-[30%]  box-border items-end mt-[3rem] " : "UserWidget flex flex-col box-border items-center mt-[3rem] w-full"}`}>
          <UserWidget
          />
        </div>
        <div className={`${isNonMobileScreens ? "PostWidget flex flex-col w-[40%]   box-border mt-[3rem] " : "PostWidget flex flex-col"}`}>
          <PostParent />
        </div>
        <div className={`${isNonMobileScreens ? "Extras  flex flex-col w-[30%] box-border h-[80%] mt-[3rem]" : "Extras flex flex-col"}`}>
          <Extras />
        </div>

      </div>

    </Fragment>
  )
}

export default Feed