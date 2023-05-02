import { Outlet } from "react-router-dom"
import { CssBaseline } from "@mui/material"
import { Fragment } from "react"
import Navbar from "./widgets/navbars/Navbar"
import NavbarPc from "./widgets/navbars/NavbarPc"
import styles from "styles/Layout.module.css"
import { useMediaQuery } from "@mui/material"
import NavbarMobile from "./widgets/navbars/NavbarMobile"

import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { changeUser } from "counter/CounterSlice"
import axios from "axios"
import { useEffect, useMemo } from "react"
const Layout = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  const obj = useSelector(state => state.counterSliceReducer)
  const token = obj.token




  return (
    <Fragment>
      <CssBaseline />

      {/* <Navbar/> */}
      <div className={` ${styles.navbar}  ParentBar tracking-wide`}>{
        token ? <>{
          isNonMobileScreens ? <NavbarPc /> : <NavbarMobile />
        }</> : <div className="box-border  h-[8.4vh] flex justify-center items-center shadow-[15px_20px_60px_5px_rgba(0,0,0,0.3)]"><p className="text-[4.5vh] font-bold text-[#01afd6] ">Sociopedia</p></div>
      }


      </div>

      <Outlet />



    </Fragment >
  )
}

export default Layout