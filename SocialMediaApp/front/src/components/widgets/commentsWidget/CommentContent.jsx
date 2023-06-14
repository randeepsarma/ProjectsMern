import React, { Fragment, useEffect, useState } from 'react'

import { getUserData } from 'api/userAuth'
import { useSelector } from 'react-redux'

export const CommentContent = ({ item, postUserId, handleDelete }) => {
    //userId of comment = item.userId
    const obj = useSelector(state => state.counterSliceReducer)
    const [userData, setuserData] = useState({})

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getUserData({ id: item.userId })
            setuserData(res.data.user)
        }

        fetchUser()
    }, [])

    return (
        <Fragment>
            <div className=' w-[90%] box-border rounded-md mb-[0.5rem] ml-[0.5rem] bg-[rgba(0,0,0,0.6)] text-[white]'>
                <div className='flex flex-row h-[50px] items-center'>
                    <img src={userData?.imageUrl} className='h-[30px] w-[30px] rounded-[50%] mt-[5px] ml-[10px]' />
                    <span className='ml-[10px] text-[12px]'>{userData?.firstname} {userData?.lastname}</span>
                </div>
                <div className='w-full min-h-[3rem]  box-border  p-[0.7rem] pl-[30px] text-[11px]' >
                    {item?.description}
                </div>
                {obj.user.id === item.userId || obj.user.id === postUserId ? <div className='w-full h-[1.7rem] box-border flex flex-row justify-end'>
                    {/* <div className="Like w-[60%] h-full flex flex-row box-border  text-[0.8rem]">
                        <div className="Icon h-full w-[25%] box-border flex justify-center ">{isLiked ? <BsHeartFill className="cursor-pointer h-[0.8rem] w-[0.8rem] text-[red] hover:h-[1.1rem] hover:w-[1.1rem]" /> : <BsHeart className="cursor-pointer h-[0.8rem] w-[0.8rem] text-[red] hover:h-[1.1rem] hover:w-[1.1rem]" />}</div>
                        <div className="Stats h-full w-[75%] box-border flex  justify-start">
                            <div>{totalLikes}</div>
                        </div>
                    </div> */}
                    {/* <p className='box-border  h-[100%] w-[20%] cursor-pointer text-[0.8rem] hover'>Edit</p> */}
                    <p className='box-border  h-[100%] w-[30%] cursor-pointer text-[0.8rem] hover:box-border hover:border-2 hover:border-dashed hover:border-[white] flex justify-center' onClick={(e) => handleDelete(e, item._id)}>Delete</p>

                </div> : <></>}
            </div>
        </Fragment>
    )
}

