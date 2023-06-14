import { Outlet } from "react-router-dom"
import { CssBaseline } from "@mui/material"
import { Fragment } from "react"

import Navbar from "./widgets/navbars/Navbar"

const Layout = () => {

  return (
    <Fragment>
      <CssBaseline />


      <Navbar />


      <Outlet />



    </Fragment >
  )
}

export default Layout