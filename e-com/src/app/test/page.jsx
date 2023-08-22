import React from 'react'

const page = () => {
  return (
    <div className={` bg-[white] top-[10%] right-[10px]  flex flex-col absolute z-[500] shadow-[10px_10px_30px_8px_rgba(0,0,0,0.3)] p-[20px]`}>
                <p className='cursor-pointer box-border hover:border-2 hover:border-dashed hover:border-[black] p-2'>Profile</p>
                <p className='cursor-pointer box-border hover:border-2 hover:border-dashed hover:border-[black] p-2'>Messages</p>
                <p className='cursor-pointer box-border hover:border-2 hover:border-dashed hover:border-[black] p-2'>Orders</p>
    </div>
  )
}

export default page