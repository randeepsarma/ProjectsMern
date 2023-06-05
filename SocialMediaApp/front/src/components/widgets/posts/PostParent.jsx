import React, { Fragment, useState, useEffect } from 'react'
import { addFriend } from "counter/CounterSlice";

import PostWidget from './postChild/PostWidget'
import CreatePost from './postChild/CreatePost'
import AdWidget from '../extras/extraschild/AdWidget'
import { useMediaQuery } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'
import { getAllUserPosts, deleteUserPost } from 'api/postAuth';
import { handleFriendRequest } from 'api/userAuth';
const PostParent = ({ profile, profileId, userData, setuserData }) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  //from feed url
  const p = useParams()
  const obj = useSelector(state => state.counterSliceReducer)
  const dispatch = useDispatch()
  const [details, setdetails] = useState([])
  //get all posts api request 
  async function fetchDetails() {

    const response = await getAllUserPosts();

    setdetails(response.data.message);
    // /console.log(response)
  }

  useEffect(() => {
    fetchDetails()
  }, [])

  //Delete request
  const handleDeletePost = async (e, postId, postUrl) => {

    setdetails(details.filter(posts => posts._id !== postId))
    await deleteUserPost(e, postId, postUrl, obj)

  }

  //Add friend Request
  const handleRequest = async (e, userId) => {
    dispatch(addFriend({ id: userId }))

    const response = await handleFriendRequest(e, userId, obj, p)
  }


  return (
    <Fragment>
      <div className='flex flex-col box-border w-[100%] items-center'>
        {profile === 'profile' ? <></> :
          <>
            <CreatePost />
            {isNonMobileScreens ? <></> : <AdWidget />}
          </>}

        {
          details.map(({ firstname, lastname, userId, imageUrl, postUrl, location, description, _id, likes, updatedAt }) => (
            profile === "profile" && profileId !== userId ? <Fragment key={_id}></Fragment> :
              <PostWidget key={_id} firstname={firstname} lastname={lastname} userId={userId} imageUrl={imageUrl} postUrl={postUrl} location={location} description={description} _id={_id} handleDeletePost={handleDeletePost} handleFriendRequest={handleRequest} likes={likes} profileId={profileId} profile={profile} updatedAt={updatedAt} />

          ))
        }


      </div>
    </Fragment>
  )
}

export default PostParent