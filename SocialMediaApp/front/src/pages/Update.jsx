import React, { useState } from 'react'
import UpdateUser from 'components/widgets/newUser/UpdateUser'
import ChangeDisplay from 'components/widgets/newUser/ChangeDisplay'
import DeleteProfile from 'components/widgets/newUser/DeleteProfile'
import { useSelector } from 'react-redux'

const Update = () => {
  const [globalCheck, setglobalCheck] = useState(false)
  const obj = useSelector(state=>state.counterSliceReducer)
  return (
    <div className={`${obj.mode === 'light' ? "bg-[#6b6b6b]" : "bg-[black]"} flex flex-col items-center justify-center h-[88vh] w-[100vw]`}>
        <ChangeDisplay globalCheck={globalCheck} setglobalCheck={setglobalCheck}/>
        <UpdateUser globalCheck={globalCheck} setglobalCheck={setglobalCheck}/>
        {/* <DeleteProfile globalCheck={globalCheck} setglobalCheck={setglobalCheck}/>
         */}
    </div>
  )
}

export default Update