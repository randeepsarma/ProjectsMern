import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const obj = useSelector(state => state.counterSliceReducer)
  const mode = obj.mode;
  const navigate = useNavigate()
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/feed/${obj.user.id}`)
  }
  return (
    <Fragment>
      <div className={`${mode === 'light' ? "" : "bg-[#27272a]"} text-[#02c8f5] flex justify-center items-center h-[90%] w-[90%] font-extrabold text-[1.7rem] `}>
        <p className='cursor-pointer' onClick={(e) => handleClick(e)}>Sociopedia</p>
      </div>
    </Fragment>
  )
}

export default Navbar