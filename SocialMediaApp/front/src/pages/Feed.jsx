import React, { Fragment, useState } from 'react'

import { useSelector } from 'react-redux'
import UserWidget from 'components/widgets/UserWidget.jsx'
import PostParent from 'components/widgets/posts/PostParent'
import Extras from 'components/widgets/extras/Extras.jsx'
import { useMediaQuery } from '@mui/material'

import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'


const Feed = ({ profile }) => {
  const dispatch = useDispatch()
  //if local storage id != to above id then don't show createpost  
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")

  //global state for token and mode
  const obj = useSelector(state => state.counterSliceReducer)
  const { id: profileId } = useParams()
  const mode = obj.mode

  const [userData, setuserData] = useState(null)
  return (
    <Fragment>
      <div className={`${isNonMobileScreens ? `Home flex flex-row tracking-wide border-box  min-h-[88vh] w-[100%] ${mode === 'light' ? "bg-[#6b6b6b]" : "bg-[black]"}` : `Home flex flex-col h-full w-[100%] ${mode === 'light' ? "bg-[#6b6b6b]" : "bg-[black]"}`}`}>
        <div className={`${isNonMobileScreens ? "UserWidget flex flex-col w-[30%]  box-border items-end " : "UserWidget flex flex-col box-border items-center w-full"}`}>
          <UserWidget profile={profile} userData={userData} setuserData={setuserData
             
        }
          />
        </div>
        <div className={`${isNonMobileScreens ? "PostWidget flex flex-col w-[40%]   box-border  " : "PostWidget flex flex-col"}`}>
          <PostParent profile={profile} profileId={profileId} setuserData={setuserData} userData={userData} />
        </div>
        <div className={`${isNonMobileScreens ? "Extras  flex flex-col w-[30%] box-border h-[80%] " : "Extras flex flex-col"}`}>
          <Extras profile={profile} userData={userData} />
        </div>

      </div>

    </Fragment>
  )
}

export default Feed