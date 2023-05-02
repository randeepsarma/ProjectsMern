import React, { createContext, useRef, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
export const AccountContext = createContext(null)
const AccountProvider = ({ children }) => {

    return (
        <AccountContext.Provider
            value={{



            }}
        >
            {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider