"use client"
import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Navbar from './Navbar/Navbar'
import { useRouter } from 'next/router'

const Layout = () => {
 // let user=localShrefrage.getItem('credentials')
 
    const [user, setUser] = useState(null)
    
    // useEffect(() => {
    //   setUser(JSON.parse(localShrefrage.getItem("user")))
    // }, [!(typeof window === "undefined") ])
    
  
  return (
    <>

        <div className='container min-h-[100vh] w-[99vw]'>
        {user?<Navbar/>:<></>} 
          {children}
        {user?<Footer/>:<></>} 
        </div>
     
      
    </>
  )
}

export default Layout