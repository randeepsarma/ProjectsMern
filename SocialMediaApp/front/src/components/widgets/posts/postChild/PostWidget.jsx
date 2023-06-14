import { useEffect } from 'react';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import {
  BsHeartFill, BsHeart
} from "react-icons/bs"
import { FcComments } from "react-icons/fc"

import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "./Comment";
import axios from "axios";
import LinearProgress from '@mui/material/LinearProgress';
import "../../../../styles/CommonStyle.css"
import { CircularProgress } from '@mui/material';
import { deleteComment, getComments, handleLikeRequest } from "api/postAuth";
import CommentEdit from 'components/widgets/commentsWidget/CommentEdit';
import { CommentContent } from 'components/widgets/commentsWidget/CommentContent';
import { getUserData } from 'api/userAuth';
const PostWidget = ({ userId, postUrl, description, _id, handleDeletePost, handleFriendRequest, likes, profile, updatedAt }) => {
  const [userInfo, setuserInformation] = useState(null)
  //console.log("postId:", _id)
  //console.log("userId", userId)
  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserData({ id: userId })
      setuserInformation(res.data.user)
    }

    fetchData()
  }, [])

  const navigate = useNavigate()
  //from feed url
  const p = useParams()

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
  const handleProfileJump = (e) => {
    e.preventDefault()
    navigate(`/profile/${userId}`)

  }
  const [comments, setComments] = useState([])
  const [commentCount, setcommentCount] = useState(0)
  useEffect(() => {
    const fetchComments = async () => {
      const res = await getComments(_id, obj.token)
      //console.log(res.data)
      setComments(res.data)
      setcommentCount(res.data.length)
    }

    fetchComments()
  }, [])
  //console.log(_id)
  let newDate = new Date(updatedAt)
  let arr = newDate.toString().split(" ")


  const handleDeleteComment = async (e, commentId) => {
    e.preventDefault()
    setComments(comments.filter(comment => comment._id !== commentId))
    setcommentCount(prev => prev - 1)
    const res = await deleteComment(obj.token, commentId)
    
  }

  return (
    <Fragment>
      <div key={_id} className={`  ${mode === "light" ? "bg-[white]" : " text-[white] bg-[#27272a]"} box-border mt-[2rem] temp temp2 temp3`}>
        <div className="Initials h-[12vh] flex flex-row  rounded-md box-border " >
          <div className="Image h-full w-[15%] box-border flex justify-center items-center pl-[0.5rem] ">
            <div className="cursor-pointer" onClick={handleProfileJump}>{
              !userInfo ? <CircularProgress /> : <img src={userInfo?.imageUrl} alt="DP" className="h-10 w-10 rounded-full hover:opacity-[0.7]" />

            }

            </div>
          </div>
          <div className="Details h-full w-[70%] flex flex-col justify-center pl-[0.8rem] cursor-pointer" >
            {!userInfo ? <LinearProgress color="success" /> : <p className="text-[0.9rem] font-bold hover:underline hover:decoration-[2px]" onClick={handleProfileJump}>{userInfo?.firstname} {userInfo?.lastname}</p>}
            <p className="text-[0.8rem] font-bold" onClick={handleProfileJump}>{arr[0] + " " + arr[1] + " " + arr[2] + " " + arr[3]}</p>
          </div>
          <div className="AddFriend h-full w-[15%] box-border  flex justify-center items-center  rounded-2xl">
            <div className={`box-border  rounded-full p-[0.4rem] bg-[#b1efff] cursor-pointer  shadow-xl ${obj.user.id === userId || profile === 'profile' ? "invisible" : ""}`} onClick={(e) => {
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
              <div>{commentCount}</div>
            </div>

          </div>
          {/*obj.user.id === userId ? <div className="Edit box-border  w-[10%] flex justify-center items-center ">
            <AiFillEdit className="h-[1.5rem] w-[1.5rem] cursor-pointer hover:h-[1.7rem] hover:w-[1.7rem]" />
          </div> : ""*/}
          {obj.user.id === userId ? <div className="Delete box-border  w-[10%] flex justify-center items-center">
            <AiFillDelete className="h-[1.3rem] w-[1.3rem] cursor-pointer hover:h-[1.5rem] hover:w-[1.5rem]" onClick={e => {
              e.preventDefault();
              handleDeletePost(e, _id, postUrl)
            }} />
          </div> : ""}
        </div>
        {checkComments ? <> {comments?.map((item) => (
          <CommentContent key={item._id} item={item} postUserId={userId} handleDelete={handleDeleteComment} />
        ))}</> :
          <CommentEdit userId={userId} postId={_id} comments={comments} setComments={setComments} setcommentCount={setcommentCount} setcheckComments={setcheckComments} />}
        
      </div>

    </Fragment>
  )
}

export default PostWidget