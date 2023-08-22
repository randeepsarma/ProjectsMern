import React from 'react'

import {AiOutlineSearch} from "react-icons/ai"
const Search = () => {
  return (
    <form action="" className='flex flex-row  items-center h-[70%] w-[57%] rounded-[5px] box-border '>
        
        <input type="text" className='outline-none p-2 h-[100%] w-[90%] rounded-l-[5px] bg-[#f6d8d8] placeholder-[#636363]' placeholder="Search for Items " />
        <button className='w-[10%] h-[100%] bg-[#006bad] flex justify-center items-center rounded-r-[5px] box-border active:border-2 active:border-[black]'>
        <AiOutlineSearch className='text-[white] w-[90%] h-[90%] ' />
        </button>
      </form>
  )
}

export default Search