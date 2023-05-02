import Pic1 from "images/dp.jpg"
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { BsHeartFill, BsHeart } from "react-icons/bs"
import { FcComments } from "react-icons/fc"
import sunset from "images/test.jpg"
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import Comment from "./Comment";
import { useMediaQuery } from "@mui/material"
import "../../../../styles/CommonStyle.css"
import { handleLikeRequest } from "api/postAuth";
const PostWidget = ({ firstname, lastname, userId, imageUrl, postUrl, location, description, _id, handleDeletePost, handleFriendRequest, likes }) => {
  const dispatch = useDispatch()
  //from feed url
  const p = useParams()
  const isNonMobileScreens = useMediaQuery('min-width:1000px')
  const lowestScreens = useMediaQuery('min-width:430px;max-width:1000px')
  const [isLiked, setisLiked] = useState(likes[p.id])
  const [totalLikes, setTotalLikes] = useState(Object.keys(likes).length)


  const obj = useSelector(state => state.counterSliceReducer)
  const mode = obj.mode;
  //console.log(obj.user.friends)
  //console.log(totalLikes)

  const [checkComments, setcheckComments] = useState(0)

  //Handle Like request
  const handleLike = async (e) => {
    //console.log('hi')
    try {
      const response = await handleLikeRequest(e, _id, p)
      //setting dynamic like 
      setTotalLikes(Object.keys(response.data.updatedPost.likes).length)

      if (response.data.updatedPost.likes[p.id]) {
        setisLiked(1);

      } else {
        setisLiked(0);

      }

    } catch (error) {

    }

  }

  return (
    <Fragment>
      <div key={_id} className={`  ${mode === "light" ? "bg-[white]" : " text-[white] bg-[#27272a]"} box-border mt-[2rem] temp temp2 temp3`}>
        <div className="Initials h-[12vh] flex flex-row  rounded-md">
          <div className="Image h-full w-[15%] box-border flex justify-center items-center pl-[0.5rem]">
            <div className="">
              <img src={imageUrl} alt="DP" className="h-12 w-12 rounded-full " />

            </div>
          </div>
          <div className="Details h-full w-[70%] flex flex-col justify-center pl-[0.8rem]">
            <p className="text-[0.9rem] font-bold">{firstname} {lastname}</p>
            <p className="text-[0.8rem] font-bold">{location}</p>
          </div>
          <div className="AddFriend h-full w-[15%] box-border  flex justify-center items-center  rounded-2xl">
            <div className={`box-border  rounded-full p-[0.4rem] bg-[#b1efff] cursor-pointer  shadow-xl ${p.id === userId ? "invisible" : ""}`} onClick={(e) => {
              e.preventDefault();

              handleFriendRequest(e, userId)
            }}>
              {
                obj.user.friends[userId] ? <HowToRegOutlinedIcon className="text-[#1d6feb] hover:h-[1.8rem] hover:w-[1.8rem]" /> : <PersonAddAltIcon className="text-[#1d6feb] hover:h-[1.8rem] hover:w-[1.8rem]" />
              }</div>
          </div>
        </div>
        <div className='Post box-border'>
          {description ? <div className="Description text-[0.9rem] min-h-[7vh] max-h-[50vh] box-border pl-[2rem] pt-[0.5rem]">{description}</div> : ""}
          {postUrl ? <div className="h-[60vh] box-border flex justify-center items-center">
            <img src={postUrl} alt="" className="h-[100%] w-[100%] " />
          </div> : ""}
        </div>
        <div className='Finals box-border  h-[10vh] flex flex-row'>

          <div className="Like w-[40%] h-full flex flex-row box-border">
            <div className="Icon h-full w-[25%] box-border flex justify-center items-center">{isLiked ? <BsHeartFill className="cursor-pointer h-[1.2rem] w-[1.2rem] text-[red] hover:h-[1.5rem] hover:w-[1.5rem]" onClick={(e) => {
              e.preventDefault()
              handleLike(e)
            }} /> : <BsHeart className="cursor-pointer h-[1.2rem] w-[1.2rem] text-[red] hover:h-[1.5rem] hover:w-[1.5rem]" onClick={(e) => {
              e.preventDefault()
              handleLike(e)
            }} />}</div>
            <div className="Stats h-full w-[75%] box-border flex  justify-start items-center text-[0.98rem] font-bold pl-4 ">
              <div>{totalLikes}</div>
            </div>
          </div>
          <div className="Comments w-[40%] h-full box-border flex flex-row">
            <div className="Icon h-full w-[25%] box-border  flex justify-center items-center "> <FcComments className="cursor-pointer h-[1.2rem] w-[1.2rem]  hover:h-[1.5rem] hover:w-[1.5rem]" onClick={() => setcheckComments(!checkComments)} /></div>
            <div className="Stats h-full w-[75%] box-border flex  justify-start items-center text-[0.98rem] font-bold pl-4">
              <div>12</div>
            </div>

          </div>
          {p.id === userId ? <div className="Edit box-border  w-[10%] flex justify-center items-center ">
            <AiFillEdit className="h-[1.5rem] w-[1.5rem] cursor-pointer hover:h-[1.7rem] hover:w-[1.7rem]" />
          </div> : ""}
          {p.id === userId ? <div className="Delete box-border  w-[10%] flex justify-center items-center">
            <AiFillDelete className="h-[1.3rem] w-[1.3rem] cursor-pointer hover:h-[1.5rem] hover:w-[1.5rem]" onClick={e => {
              e.preventDefault();
              handleDeletePost(e, _id, postUrl)
            }} />
          </div> : ""}
        </div>
        {checkComments ? <><Comment /><Comment /></> : <></>}

      </div>

    </Fragment>
  )
}

export default PostWidget