import React, { Fragment } from 'react'
import UserWidget from 'components/widgets/UserWidget.jsx'
import PostParent from 'components/widgets/posts/PostParent'
import Extras from 'components/widgets/extras/Extras.jsx'
import { useMediaQuery } from '@mui/material'
const Home = () => {
const isNonMobileScreens = useMediaQuery("(min-width:1000px)")

  return (
  <Fragment>
    <div className={`${isNonMobileScreens?"Home flex flex-row h-full w-full bg-[#dfdfdf]":"Home flex flex-col h-full w-full"}`}>
      <div className={`${isNonMobileScreens?"UserWidget flex flex-col w-[30%]  box-border items-end":"UserWidget flex flex-col box-border items-center"}`}>
        <UserWidget/>
      </div>
      <div className={`${isNonMobileScreens?"PostWidget flex flex-col w-[40%]   box-border":"PostWidget flex flex-col"}`}>
        <PostParent/>
      </div>
      <div className={`${isNonMobileScreens?"Extras  flex flex-col w-[30%] box-border h-[80%]":"Extras flex flex-col"}`}>
        <Extras/>   
      </div>

    </div>

  </Fragment>
  )
}

export default Home