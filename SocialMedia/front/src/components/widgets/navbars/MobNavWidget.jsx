import { useNavigate } from "react-router-dom"

import { BsFillMoonFill, BsMoon, BsFillBellFill, BsBell } from "react-icons/bs"

import { AiFillQuestionCircle, AiOutlineQuestionCircle } from "react-icons/ai"
import { MdMessage, MdOutlineMessage } from "react-icons/md"


import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { changeConvoId, changePerson, changeTheme, changeToken, changeUser } from "counter/CounterSlice"
const MobNavWidget = () => {
  const navigate = useNavigate()
  const obj = useSelector(state => state.counterSliceReducer)
  const myData = obj.mode

  const { imageUrl } = obj.user
  const dispatch = useDispatch()

  //console.log(myData)
  const [logout, setLogout] = useState(0)
  const handleMessage = (e) => {
    e.preventDefault();
    navigate(`message/${obj.user.id}`)
  }
  return (
    <div className={`MnvReal box-border h-[40vh] w-[20vw] ${myData === "light" ? "bg-[white]" : "bg-[#373737]"} rounded-md shadow-[0px_3px_20px_5px_rgba(0,0,0,0.3)]`}>
      <div className='w-full h-[25%] box-border  flex flex-row '>
        <div className='h-full w-[50%] box-border  flex justify-center items-center'>{
          myData === "light" ? <BsFillMoonFill onClick={() => dispatch(changeTheme())} className="cursor-pointer h-[1.4rem] w-[1.4rem]" /> : <BsMoon onClick={() => dispatch(changeTheme())} className="cursor-pointer h-[1.4rem] w-[1.4rem] text-[white]" />
        }</div>
        <div className='h-full w-[50%] box-border  flex justify-center items-center' onClick={(e) => handleMessage(e)}>{
          myData === "light" ? <MdMessage className="cursor-pointer h-[1.4rem] w-[1.4rem]" /> : <MdOutlineMessage className="cursor-pointer h-[1.4rem] w-[1.4rem] text-[white]" />
        }</div>
      </div>
      <div className='w-full h-[25%] box-border  flex flex-row'>
        <div className='h-full w-[50%] box-border flex justify-center items-center'>{
          myData === "light" ? <BsFillBellFill className="cursor-pointer h-[1.4rem] w-[1.4rem]" /> : <BsBell className="cursor-pointer h-[1.4rem] w-[1.4rem] text-[white]" />
        }</div>
        <div className='h-full w-[50%] box-border  flex justify-center items-center'>
          {
            myData === "light" ? <AiFillQuestionCircle className="cursor-pointer h-[1.4rem] w-[1.4rem]" /> : <AiOutlineQuestionCircle className="cursor-pointer h-[1.4rem] w-[1.4rem] text-[white]" />
          }
        </div>
      </div>
      <div className='w-full h-[50%] box-border '>
        <div className='w-full box-border h-[50%] flex flex-row justify-center items-center'>

          <img src={imageUrl} alt="picture" className="h-[3rem] w-[3rem] rounded-full shadow-[0px_3px_40px_7px_rgba(0,0,0,0.3)]" />



        </div>


        <div className='w-full box-border h-[50%] flex justify-center items-center'>
          <button className="h-[50%] w-[85%]  box-border bg-[#4ebcf7] rounded-md hover:text-[0.9rem] font-semibold shadow-[0px_3px_30px_7px_rgba(0,0,0,0.3)] text-[0.8rem]" onClick={() => {
            dispatch(changeToken(null))
            dispatch(changeUser({ user: null }))
            dispatch(changeConvoId({ id: null }))
            dispatch(changePerson({ person: null }))
            navigate('/')

          }}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default MobNavWidget