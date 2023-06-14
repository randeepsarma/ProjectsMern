import { useNavigate } from "react-router-dom"
import pic1 from "images/dp.jpg"
import { useMediaQuery } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { changeToken, changeUser, changePerson, changeConvoId } from "counter/CounterSlice"
const Logout = () => {

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const obj = useSelector(state => state.counterSliceReducer)
  const mode = obj.mode

  const { imageUrl } = obj.user

  return (
    <div className={`h-[165px] w-[200px] tracking-wide box-border  rounded-md ${mode === 'light' ? "bg-[white]" : "bg-[#373737] text-[black]"} shadow-[0px_3px_30px_8px_rgba(0,0,0,0.3)]`}>
      <div className='w-full box-border h-[50%] flex flex-row justify-center items-center'>

        <img src={imageUrl} alt="picture" className="h-[3.5rem] w-[3.5rem] rounded-full shadow-[0px_3px_40px_7px_rgba(0,0,0,0.3)]" />



      </div>

      <div className='h-[0.09%] w-full flex justify-center'>
        <div className='h-full w-[80%] jflex bg-[grey]'></div>
      </div>
      <div className='w-full box-border h-[49.9%] flex justify-center items-center '>
        <button className={`h-[50%] ${isNonMobileScreens ? "w-[50%]" : "w-[50%]"} hover:h-[60%] hover:w-[60%] box-border bg-[#4ebcf7] rounded-md tracking-wide hover:text-[110%] font-semibold shadow-[0px_3px_30px_7px_rgba(0,0,0,0.3)]  text-[90%]`} onClick={() => {
          dispatch(changeToken())
          dispatch(changeUser({ user: null }))
          dispatch(changeConvoId(null))
          dispatch(changePerson(null))
          navigate('/')


        }}>Logout</button>
      </div>
    </div>
  )
}

export default Logout