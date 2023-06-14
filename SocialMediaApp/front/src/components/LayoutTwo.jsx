import { CssBaseline } from '@mui/material'
import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'

const LayoutTwo = () => {
  return (
    <Fragment>
      <CssBaseline />


      


      <Outlet />



    </Fragment >
  )
}

export default LayoutTwo