import React, { useReducer, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'; 
import { IconButton } from '@mui/material';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { changeUser } from 'counter/CounterSlice';
import { updateDetails } from 'api/userAuth';
const EachItem = ({num,item,globalCheck,setglobalCheck,dispatch:funcDispatch}) => {
  
  const obj=useSelector(state=>state.counterSliceReducer)
  const [desc, setdesc] = useState("")
  const [updateButton, setupdateButton] = useState(false)
  const [editLabel, seteditLabel] = useState(item.label)
  const dispatch = useDispatch()
  
  const handleEdit=async(e)=>{
    e.preventDefault()
  if(!updateButton && !globalCheck){
    setupdateButton(true)
    setglobalCheck(true)

  }else if(updateButton && globalCheck ){
    
    if(desc){
    const response = await updateDetails(obj.user.id,obj.token,desc,num)/* axios({
      url: `http://localhost:5000/user/update`,
      method: 'PATCH',
      data:{
        userId:obj.user.id,
        val: desc,
        num:num,
      },
      headers: {
          'authorization': `Bearer ${obj.token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
      }
      
  }) */

  if(num===0){
    funcDispatch({type:'firstname',payload:response.data.firstname})
    dispatch(changeUser({
      user:{
        ...obj.user,
        firstname:response.data.firstname, 
      }
    }))
  }else if(num===1){
    funcDispatch({type:'lastname',payload:response.data.lastname})
    dispatch(changeUser({
      user:{
        ...obj.user,
        lastname:response.data.lastname,
      }
    }))
  }else if(num===2){
    funcDispatch({type:'email',payload:response.data.email})
    dispatch(changeUser({
      user:{
        ...obj.user,
        email:response.data.email,
      }
    }))
  }else if(num===4){
    funcDispatch({type:'occupation',payload:response.data.occupation})
    dispatch(changeUser({
      user:{
        ...obj.user,
        occupation:response.data.occupation,
      }
    }))
  }else if(num===5){
    funcDispatch({type:'location',payload:response.data.location})
    dispatch(changeUser({
      user:{
        ...obj.user,
        location:response.data.location,
      }
    }))
  }    

  
} 
    
    setdesc("")
    setupdateButton(false)
    setglobalCheck(false)
  }
  }
  
 
  return (
    <form className={` w-[100%] h-[70px] flex flex-row items-center cursor-pointer hover:bg-[#a1a1a1] text-[12px]  ${obj.mode==='light'?'':'hover:text-[black]'}`}>
        <span className='w-[35%] box-border ml-5
        flex items-center h-[100%] '>{item.displayName}</span>
        <span className='w-[5%] box-border h-[100%] flex items-center justify-center '>:</span>
        {!updateButton?
        <span className='w-[45%] box-border font-bold flex items-center  h-[100%] '>{item.value}</span>:
        <input className={`w-[45%] rounded-lg outline-none h-[50%] p-2 ${updateButton && globalCheck?"border-[1px]":""}`} value={desc} onChange={(e)=>{
          e.preventDefault()
          setdesc(e.target.value)
          seteditLabel(e.target.name)
        }} name={editLabel} type={num===2?"email":"text"}/>
        }
        <span className='w-[15%]  box-border pr-1  h-[100%] flex items-center justify-end'>
          <IconButton onClick={handleEdit}>
          {!updateButton?
          <EditIcon
        sx={{
            width:'20px',
            height:'20px',
            color:obj.mode==='light'?"black":'white',
            
          }}
          
        />:
        <UpgradeIcon 
        sx={{
          width:'25px',
          height:'25px',
          color:'#90EE90',
          
        }}
        
        />
        }
          </IconButton>
        </span>
       </form>
  )
}

export default EachItem