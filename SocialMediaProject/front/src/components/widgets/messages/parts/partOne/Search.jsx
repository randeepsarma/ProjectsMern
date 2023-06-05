import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Search = ({ setText, text }) => {
    const [searchVal, setSearchVal] = useState('')
    const obj = useSelector(state => state.counterSliceReducer)

    return (
        <div className={` w-[100%]  h-[10%] flex justify-center items-center border-b-[1px]  ${obj.mode === 'dark' ? "border-[white]" : "border-[black]"}`}>
            <input
                type="text" className={`border-box bg-[#b6b6b6] rounded-[2px] h-[55%] w-[60%] p-2 placeholder-[black] `} placeholder='Search...'
                value={searchVal}
                onChange={(e) => setText(e.target.value)}
            /* onKeyPress={(e) => sendText(e)} */
            />
        </div>
    )
}

export default Search