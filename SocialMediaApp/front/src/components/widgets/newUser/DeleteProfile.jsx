import axios from 'axios'
import { changeAlertMessages, changeMessagesManual, changePerson, changeToken, changeUser } from 'counter/CounterSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const DeleteProfile = ({globalCheck,setglobalCheck}) => {
  const obj = useSelector(state=>state.counterSliceReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClick =async(e)=>{
    e.preventDefault()
    if(globalCheck===false){
      const res= await axios({
        url:  'http://localhost:5000/user/deleteProfile',
        method: 'DELETE',
        headers: {
            'authorization': `Bearer ${obj.token}`,
            'Content-Type': 'application/x-www-form-urlencoded',

        },
        data: {
            userId:obj.user.id
        }
    })
    dispatch(changeToken(null))
    dispatch(changeUser({ user: null }))

    //dispatch(changeConvoId())
    dispatch(changePerson(null))
    dispatch(changeMessagesManual())
    dispatch(changeAlertMessages(null))
    navigate("/")
    }
  }
  return (
    <div className='w-[400px] h-[50px] rounded-lg box-border bg-[red] hover:bg-[#ff6d6d] text-[white] flex justify-center items-center cursor-pointer' onClick={handleClick}>Delete Profile</div>
  )
}

export default DeleteProfile