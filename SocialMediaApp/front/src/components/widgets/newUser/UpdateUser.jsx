import React, { useState,useReducer } from 'react'
import { useSelector } from 'react-redux'

import EachItem from './EachItem';
import ChangeDisplay from './ChangeDisplay';
import { useMediaQuery } from '@mui/material';
import "./ComnStyle.css"
 
export const ACTIONS = {
  firstname:'firstname',
  imageUrl:'imageUrl',
  lastname:'lastname',
  location:'location',
  occupation:'occupation',
  email:'email',
  password:'password'
}
export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.firstname:

      return {
        ...state,
         firstname:{
          ...state.firstname,
          value:action.payload
         }
      }
    case ACTIONS.lastname:
      return {
        ...state,
        lastname:{
         ...state.lastname,
         value:action.payload
        }
      }
    case ACTIONS.location:
      return {
        ...state,
        location:{
         ...state.location,
         value:action.payload
        }
      }
    case ACTIONS.occupation:
      return {
        ...state,
        occupation:{
         ...state.occupation,
         value:action.payload
        }
      }
    case ACTIONS.email:
      return {
        ...state,
        email:{
         ...state.email,
         value:action.payload
        }
      } 
    default:
      return state             
  }
};

const UpdateUser = ({setglobalCheck,globalCheck}) => {
  const obj = useSelector(state=>state.counterSliceReducer)

const INITIAL_STATE ={
  firstname:
  {
      displayName:"FirstName",
      value:obj.user.firstname,
      label:"firstname",
  },
  lastname:
  {
      displayName:"LastName",
      value:obj.user.lastname,
      label:"lastname",
  },
  email:
  {
      displayName:"Email",
      value:obj.user.email,
      label:"email",
  },
  password:
  {
      displayName:"Password",
      value:"******",
      label:"password",
  },
  occupation:
  {
      displayName:"Occupation",
      value:obj.user.occupation,
      label:"occupation",
  },
  location:
  {
      displayName:"Location",
      value:obj.user.location,
      label:"location",
  }
}
 

//console.log(state)
const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  return (
    <div className={`${obj.mode === 'light' ? "bg-[white]" : "bg-[#27272a] text-[white]"}   rounded-lg box-border mb-[10px] tep tep2 tep3`}>
      
     
      {
         Object.entries(state).map(([key,val],id)=>(
          <EachItem num={id} key={id} item={val} globalCheck={globalCheck} setglobalCheck={setglobalCheck} dispatch={dispatch} state={state} />
         ))  
       
      }
       
  
      
    </div>
  )
}

export default UpdateUser