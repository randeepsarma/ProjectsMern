import Navbar from "./Navbar"
import { BsSearch } from "react-icons/bs"
import { BsFillMoonFill, BsMoon, BsFillBellFill, BsBell } from "react-icons/bs"
import { useState } from "react"
import { AiFillQuestionCircle, AiOutlineQuestionCircle } from "react-icons/ai"
import { MdMessage, MdOutlineMessage } from "react-icons/md"
import { AiFillDownCircle, AiOutlineDownCircle, AiFillCloseCircle, AiOutlineCloseCircle } from "react-icons/ai"
import styles from "styles/Logout.module.css"
import Logout from "../Logout"
import { useDispatch, useSelector } from "react-redux"
import { changeTheme } from "counter/CounterSlice"
import { useNavigate } from "react-router-dom"
import nav from "../../../styles/NavbarM.module.css"
const NavbarPc = () => {
    const obj = useSelector(state => state.counterSliceReducer)
    const mode = obj.mode;

    const navigate = useNavigate(`/message/${obj.user.id}`)
    const { firstname } = obj.user
    const dispatch = useDispatch()
    const [logout, setLogout] = useState(0)
    const handleMessage = (e) => {
        e.preventDefault();
        navigate(`message/${obj.user.id}`)
    }
    return (
        <div className={`Navbar-Pc flex flex-row box-border  h-[8vh] w-full ${styles.container} ${mode === 'light' ? '' : 'bg-[#27272a] text-[white] shadow-[0px_3px_30px_8px_rgba(0,0,0,0.3)]'}  `}>

            <div className={`${styles.logout} ${logout ? "" : "invisible"}`}>
                <Logout />
            </div>
            <div className="One flex flex-row w-[50%] ">
                <div className="SiteName box-border  w-[50%] flex justify-end">
                    <Navbar />
                </div>
                <div className="SearchBar flex flex-row box-border items-center pl-[2%] w-[50%]">
                    <input type="text" className="w-[70%] h-[65%] rounded-3xl pl-3 text-[0.9rem] bg-[#878787] outline-none placeholder:text-[white]" placeholder="Search..." />
                    <div className="h-[80%] w-[20%] flex justify-center items-center ">
                        <button className="h-[2.2rem] w-[2.2em]   
                    rounded-full box-border flex justify-center items-center bg-[#969696]">
                            <BsSearch className="cursor-pointer h-[1rem] w-[1rem] hover:h-[1.2rem] hover:w-[1.2rem]" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="Two flex flex-row w-[50%] justify-end">
                <div className="w-[80%] h-full box-border flex flex-row">
                    <div className="ChangeTheme w-[15%] h-full box-border  flex justify-center items-center">
                        {
                            mode ? <BsFillMoonFill onClick={() => dispatch(changeTheme())} className="cursor-pointer h-[1.4rem] w-[1.4rem]" /> : <BsMoon onClick={() => dispatch(changeTheme())} className="cursor-pointer h-[1.4rem] w-[1.4rem]" />
                        }
                    </div>

                    <div className="Message w-[15%] h-full box-border  flex justify-center items-center" onClick={(e) => handleMessage(e)}>
                        {
                            mode ? <MdMessage className="cursor-pointer h-[1.4rem] w-[1.4rem]" /> : <MdOutlineMessage className="cursor-pointer h-[1.4rem] w-[1.4rem]" />
                        }
                    </div>

                    <div className="Bell w-[15%] h-full box-border  flex justify-center items-center">
                        {
                            mode ? <BsFillBellFill className="cursor-pointer h-[1.4rem] w-[1.4rem]" /> : <BsBell className="cursor-pointer h-[1.4rem] w-[1.4rem]" />
                        }
                    </div>
                    <div className="Help w-[15%] h-full box-border  flex justify-center items-center">
                        {
                            mode ? <AiFillQuestionCircle className="cursor-pointer h-[1.4rem] w-[1.4rem]" /> : <AiOutlineQuestionCircle className="cursor-pointer h-[1.4rem] w-[1.4rem] " />
                        }
                    </div>
                    <div className="Logout w-[40%] box-border h-full flex justify-center items-center">
                        <div className="box-border w-[90%] h-[62%] rounded-md flex flex-row bg-[#969696]">
                            <div className="U_Parent w-[80%] h-full box-border  flex justify-center items-center">
                                <p className="font-bold text-[black]">{firstname}</p>
                            </div>
                            <button className="box-border  h-full w-[20%] flex justify-start items-center " onClick={() => setLogout(!logout)}>
                                {logout ?

                                    <>{mode === 'dark' ? <AiFillCloseCircle className="h-[1.5rem] w-[1.5rem] bg-[#373737] rounded-full" /> :
                                        <AiOutlineCloseCircle className="h-[1.5rem] w-[1.5rem] bg-[white] rounded-full" />}</>

                                    :
                                    <>
                                        {mode === 'dark' ? <AiFillDownCircle className="h-[1.5rem] w-[1.5rem] bg-[#373737] rounded-full" /> :
                                            <AiOutlineDownCircle className="h-[1.5rem] w-[1.5rem] bg-[white] rounded-full" />}
                                    </>
                                }

                            </button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default NavbarPc