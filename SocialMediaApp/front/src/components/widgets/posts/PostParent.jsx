import React, { Fragment, useState, useEffect } from 'react'
import { addFriend } from "counter/CounterSlice";
import {storage} from "../../../firebase.js"

import PostWidget from './postChild/PostWidget'
import CreatePost from './postChild/CreatePost'
import AdWidget from '../extras/extraschild/AdWidget'
import { useMediaQuery } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'
import { getAllUserPosts, deleteUserPost } from 'api/postAuth';
import { handleFriendRequest } from 'api/userAuth';
import Pusher from 'pusher-js';
import axios from 'axios';

import { getStorage, ref, deleteObject } from "firebase/storage";

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
  }

  useEffect(() => {
    fetchDetails()
  }, [])
  
  
  //Delete request
  const handleDeletePost = async (e, postId, postUrl) => {
  setdetails(details.filter(posts => posts._id !== postId))  
  if(postUrl){  
      const arr = postUrl.split("/")[7].split("?")[0].split("%")
      //const url = `${arr[0]}/${arr[1].slice(2)}`
      //console.log(``)
      const desertRef = ref(storage,`/${arr[0]}/${arr[1].slice(2)}`);
      //Delete the file
      deleteObject(desertRef).then(() => {
        console.log('Done')
      }).catch((error) => {
        console.log(error)
      }); 
  }
  const res= await deleteUserPost(e, postId, postUrl, obj) 
  

  }

  //Add friend Request
  const handleRequest = async (e, userId) => {
    dispatch(addFriend({ id: userId }))

    const response = await handleFriendRequest(e, userId, obj, p)
  }
  useEffect(() => {
    const pusher = new Pusher('b4714209ae2fb62c0dd3', {
      cluster: 'ap2'
  });
  const channel = pusher.subscribe('live-feed-channel');
  channel.bind('update-event', (update) => {
    // Update the state with the received update
   setdetails((prevUpdates) => [update,...prevUpdates]);
  });
  channel.bind('delete-post',({deletedId,userId})=>{
    //console.log(userId,deletedId)

    if(userId !== obj.user.id)
      setdetails(prev=>prev.filter(posts => posts._id !== deletedId))
  })
  // Clean up Pusher subscription when component unmounts
  return () => {
    pusher.unsubscribe('live-feed-channel');
  };
  }, [])
  

  return (
    <Fragment>
      <div className='flex flex-col box-border w-[100%] items-center'>
        {profile === 'profile' ? <></> :
          <>
            <CreatePost />
            {isNonMobileScreens ? <></> : <AdWidget />}
          </>}

        {
          details.map(({  userId, postUrl, location, description, _id, likes, updatedAt }) => (
            profile === "profile" && profileId !== userId ? <Fragment key={_id}></Fragment> :
              <PostWidget key={_id} userId={userId}  postUrl={postUrl} location={location} description={description} _id={_id} handleDeletePost={handleDeletePost} handleFriendRequest={handleRequest} likes={likes} profileId={profileId} profile={profile} updatedAt={updatedAt} />

          ))
        }


      </div>
    </Fragment>
  )
}

export default PostParent