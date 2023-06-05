import { useState, useEffect, Fragment } from 'react'
import "./Navbar.scss"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { changeTheme, changeLocal, changeToken, changeUser, changeConvoId, changePerson, changeMessages, changeAlertMessages, changeMessagesManual } from 'counter/CounterSlice'
import { BsFillBellFill, BsMoonFill } from "react-icons/bs"
import { AiFillQuestionCircle, AiOutlineQuestionCircle } from "react-icons/ai"
import { MdMessage } from "react-icons/md"

import WbSunnyIcon from '@mui/icons-material/WbSunny';
import axios from 'axios'
import { socket } from 'App'
import Pusher from 'pusher-js'
import { changeRead } from 'api/messageAuth'
import { useMediaQuery } from '@mui/material'



import React from 'react'


const funct = async (user, token) => {

    const res = await changeRead(user?.id, token)
    //console.log(res)
}

const NavComp = () => {
    const obj = useSelector(state => state.counterSliceReducer)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const handleMessage = async (e) => {
        e.preventDefault()
        //making unread messages 0
        dispatch(changeMessagesManual(0))
        //on navigating to /message change all read to true

        funct(obj.user, obj.token)
        navigate(`/message/${obj.user.id}`)
    }
    return (
        <Fragment>
            <span>  {
                obj.mode === 'dark' ? <WbSunnyIcon onClick={() => dispatch(changeTheme())} className="cursor-pointer h-[1.4rem] w-[1.4rem] text-[yellow]" /> : <BsMoonFill onClick={() => dispatch(changeTheme())} className="cursor-pointer h-[1.4rem] w-[1.4rem] text-[black]" />
            }</span>
            <span className='Parent'>
                <MdMessage className={`cursor-pointer h-[1.4rem] w-[1.4rem]  ${obj.mode === 'dark' ? "text-[#7e7e7e]" : "text-[black]"}`} onClick={handleMessage} />
                <span className={`Child cursor-pointer ${(window.location.href.toString().includes("message") || obj.messagesCount == 0) ? "invisible" : ""}`}>{obj.messagesCount > 50 ? "50+" : obj.messagesCount}</span>
            </span>
            <span className='Parent'>
                <BsFillBellFill className={`cursor-pointer h-[1.4rem] w-[1.4rem]  ${obj.mode === 'dark' ? "text-[#7e7e7e]" : "text-[black]"}`} />
                <span className='Child cursor-pointer'>2</span>
            </span>

            <span>
                {
                    obj.mode === 'dark' ? <AiFillQuestionCircle className={`cursor-pointer h-[1.4rem] w-[1.4rem] text-[#7e7e7e]`} /> : <AiOutlineQuestionCircle className="cursor-pointer h-[1.4rem] w-[1.4rem]  text-[black]" />
                }
            </span>
        </Fragment>
    )
}






const Navbar = () => {

    const [open, setOpen] = useState(false)



    const dispatch = useDispatch()
    const obj = useSelector(state => state.counterSliceReducer)
    const currentUser = obj.user != null ? obj.user : ""

    const navigate = useNavigate()
    const handleLogout = (e) => {
        e.preventDefault()
        try {
            //socket.emit('discon', obj.user.id)
            setOpen(false)
            dispatch(changeToken(null))
            dispatch(changeUser({ user: null }))

            //dispatch(changeConvoId())
            dispatch(changePerson(null))
            dispatch(changeMessagesManual())
            dispatch(changeAlertMessages(null))
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
    //console.log(obj.messagesCount)
    //console.log(obj.token)
    useEffect(() => {
        var isExpiredToken = false;

        var dateNow = new Date();

        if (obj.token?.exp < dateNow.getTime() / 1000) {
            isExpiredToken = true;
        }
        if (isExpiredToken) {
            handleLogout()
        }
    }, [obj.token])

    const handleMessage = async (e) => {
        e.preventDefault()
        //making unread messages 0
        dispatch(changeMessagesManual(0))
        //on navigating to /message change all read to true

        funct(obj.user, obj.token)
        navigate(`/message/${obj.user.id}`)
    }

    useEffect(() => {
        const pusher = new Pusher('b4714209ae2fb62c0dd3', {
            cluster: 'ap2'
        });
        const channel = pusher.subscribe(`messages-${obj.user?.id}`);
        channel.bind('inserted', function (data) {
            //console.log(data)
            dispatch(changeAlertMessages())

            if (!window.location.href.toString().includes("message")) {

                dispatch(changeMessages())
            } else if (window.location.href.toString().includes("message")) {

                data.readByreceiver = true
                dispatch(changeMessagesManual(0))

                funct(obj.user, obj.token)

            }
        });
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }
    }, [])
    //console.log(obj.convoId)
    //c//onsole.log(obj.convoId)


    //if user is present send him to socket server to be added in the online users array
    /*    useEffect(() => {
           socket.emit("addUser", obj.user?.id)
       }, [obj.user]) */

    const handleClick = (e) => {
        e.preventDefault();

        navigate(`/feed/${obj.user.id}`)
    }

    const isBigNav = useMediaQuery("(min-width:600px)")
    const handleOpen = (e) => {
        e.preventDefault()
        setOpen(prev => !prev)
    }

    return (
        <div className={`navbar ${obj.mode === 'dark' ? "bg-[#060944] text-[#2d93ff]" : "bg-[#aaaaaa] text-[#005eff]"}`}>
            <div className="container">
                <div className="logo">

                    <span className="text cursor-pointer" onClick={handleClick}>SocioNet</span>
                </div>
                {obj.user ?
                    <div className="links">
                        {isBigNav ? <NavComp /> : <></>}
                        <div className="user" >
                            <img src={obj.user.imageUrl} alt="" onClick={e => handleOpen(e)} />
                            <span>{currentUser?.username}</span>
                            {open && (
                                <div className={`options ${obj.mode === 'dark' ? "bg-[#0c0f7c] text-[white]" : "bg-[white] text-[black] font-bold shadow-[10px_10px_30px_8px_rgba(0,0,0,0.3)]"}`}>
                                    <div onClick={handleLogout}>
                                        Logout
                                    </div>
                                    {!isBigNav ? <>
                                        <div className='flex flex-row justify-between relative text-[white]'>
                                            {obj.mode === 'dark' ? <WbSunnyIcon onClick={() => dispatch(changeTheme())} className="cursor-pointer h-[1.4rem] w-[1.4rem] text-[yellow]" /> : <BsMoonFill onClick={() => dispatch(changeTheme())} className="cursor-pointer h-[1.4rem] w-[1.4rem] text-[black]" />
                                            }
                                            <MdMessage className={`cursor-pointer h-[1.4rem] w-[1.4rem]  ${obj.mode === 'dark' ? "text-[#7e7e7e]" : "text-[black]"}`} onClick={handleMessage} />
                                            <span className={`Child  cursor-pointer bg-[red] rounded-[50%] h-[15px] left-[145px] top-[-7px]  absolute text-[10px] font-bold w-[15px] flex justify-center items-center ${(window.location.href.toString().includes("message") || obj.messagesCount == 0) ? "invisible" : ""}`}>{obj.messagesCount > 50 ? "50+" : obj.messagesCount}</span>
                                        </div>
                                        <div className='flex flex-row justify-between relative text-[white]'>
                                            {
                                                obj.mode === 'dark' ? <AiFillQuestionCircle className={`cursor-pointer h-[1.4rem] w-[1.4rem] text-[#7e7e7e]`} /> : <AiOutlineQuestionCircle className="cursor-pointer h-[1.4rem] w-[1.4rem]  text-[black]" />
                                            }
                                            <BsFillBellFill className={`cursor-pointer h-[1.4rem] w-[1.4rem]  ${obj.mode === 'dark' ? "text-[#7e7e7e]" : "text-[black]"}`} />
                                            <span className='Child cursor-pointer bg-[red] rounded-[50%] h-[15px] w-[15px] flex justify-center items-center left-[145px] top-[-5px]  absolute text-[10px] font-bold '>2</span>
                                        </div>
                                    </> : <></>
                                    }
                                </div>
                            )}
                        </div>

                    </div> : <></>}
            </div>
        </div>
    )
}

export default Navbar