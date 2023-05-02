import React from 'react'
import Navbar from './Navbar'
import { GrClose } from "react-icons/gr"
import { useState, useRef } from 'react'
import { GiHamburgerMenu } from "react-icons/gi"
import MobNavWidget from './MobNavWidget'
import { ImCross } from "react-icons/im"
import styles from "styles/NavbarM.module.css"

import { useSelector } from 'react-redux'
const NavbarMobile = () => {
    const [settings, setSettings] = useState(0)
    const mainRef = useRef(null)
    const firstRef = useRef(null)
    const secondRef = useRef(null)
    const thirdRef = useRef(null)
    const obj = useSelector(state => state.counterSliceReducer)
    const mode = obj.mode;

    const handleClick = (e) => {
        e.preventDefault();
        if (!settings) {
            mainRef.current.classList.add("container")
            firstRef.current.classList.add("first")
            secondRef.current.classList.add("second")
            thirdRef.current.classList.add("third")
            setSettings(!settings)
        } else {
            mainRef.current.classList.remove("container")
            firstRef.current.classList.remove("first")
            secondRef.current.classList.remove("second")
            thirdRef.current.classList.remove("third")
        }
        setSettings(!settings)
    }

    return (
        <div className={`MobileNav h-[8vh] box-border flex flex-row ${mode === 'light' ? "bg-[white]" : "bg-[#27272a] shadow-[0px_3px_30px_8px_rgba(0,0,0,0.3)]"}  w-full `} >

            <div className='box-border  h-full w-[60%]'><Navbar /></div>
            <div className={`box-border  h-full w-[40%] flex flex-col justify-center items-end pr-[1.5rem] flex-2 ${styles.container}`} ref={mainRef}>
                {
                    settings ? <ImCross className={`h-[1.8rem] w-[1.8rem] cursor-pointer ${mode === 'light' ? "" : "text-[white]"}`} onClick={() => setSettings(!settings)} /> : <GiHamburgerMenu className={`h-[2rem] w-[2rem] cursor-pointer ${mode === 'light' ? "" : "text-[white]"}`} onClick={() => setSettings(!settings)} />

                }
                <div className={`${styles.child} ${settings ? "" : "invisible"}`}>
                    <MobNavWidget />
                </div>


            </div>
        </div>
    )
}

export default NavbarMobile