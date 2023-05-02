import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import pic from "../../../../images/dp.jpg"
import { BsHeartFill, BsHeart } from "react-icons/bs"

const Comment = () => {
  const [isLiked, setisLiked] = useState(0)
  const [totalLikes, setTotalLikes] = useState(12)


   const navigate = useNavigate() 
  return (
    <Fragment>
        <div className=' w-[90%] box-border border-[1px] border-black rounded-md mb-[0.5rem] ml-[0.5rem]'>
          <div className='w-full h-[3rem] box-border  flex flex-row'>
            <div className='h-full w-[25%] box-border flex justify-center items-center'>
            <img src={pic} alt="" className='h-[70%] rounded-full'  />
            </div>
            <div className='h-full w-[75%] box-border flex  justify-start items-center text-[0.8rem] font-semibold'>Randeep Sarma</div>
          </div>
          <div className='w-full min-h-[3rem]  box-border text-[0.8rem] p-[0.7rem]' >
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut consectetur tempora velit provident illo temporibus ipsum dolor consequatur blanditiis maxime corporis, totam rerum maiores sapiente exercitationem suscipit eveniet accusantium voluptas. Doloribus inventore ipsum, tenetur fuga, asperiores architecto labore, aperiam quae sint similique eveniet explicabo fugit odit numquam animi placeat et. Suscipit atque dolorum harum possimus quis pariatur illum nemo, officiis vel? Et nihil beatae voluptatem soluta veritatis aperiam ullam itaque libero. Voluptas porro dolorem cupiditate, ea nulla libero, odit ad id eveniet consequuntur accusamus temporibus non voluptatum. Distinctio nulla voluptas perferendis officia fugit quasi alias perspiciatis magnam? Eos, atque placeat.
          </div>
          
          <div className='w-full h-[1.7rem] box-border flex flex-row justify-end'>
          <div className="Like w-[60%] h-full flex flex-row box-border  text-[0.8rem]">
            <div className="Icon h-full w-[25%] box-border flex justify-center ">{isLiked ? <BsHeartFill className="cursor-pointer h-[0.8rem] w-[0.8rem] text-[red] hover:h-[1.1rem] hover:w-[1.1rem]"  /> : <BsHeart className="cursor-pointer h-[0.8rem] w-[0.8rem] text-[red] hover:h-[1.1rem] hover:w-[1.1rem]"/>}</div>
            <div className="Stats h-full w-[75%] box-border flex  justify-start">
              <div>{totalLikes}</div>
            </div>
          </div>
            <p className='box-border  h-[100%] w-[20%] cursor-pointer text-[0.8rem] hover'>Edit</p>
            <p className='box-border  h-[100%] w-[20%] cursor-pointer text-[0.8rem]'>Delete</p>
            
          </div>
        </div>
    </Fragment>
  )
}

export default Comment