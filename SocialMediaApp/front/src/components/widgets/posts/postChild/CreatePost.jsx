import { AiFillPicture } from "react-icons/ai"
import { FaVideo } from "react-icons/fa"
import { CgAttachment } from "react-icons/cg"
import { AiFillAudio } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useState, useCallback, useEffect } from "react"
import { useDropzone } from 'react-dropzone'
import { useMediaQuery } from "@mui/material"
//import { useCreatePostRequestMutation } from "counter/postApi"
import { createPostRequest } from "api/postAuth"
import pic1 from "../../../../images/dp.jpg"
import { useNavigate, useParams } from "react-router-dom"
import "../../../../styles/CommonStyle.css"
import { uploadFile } from "utils/newRequest"


const CreatePost = () => {
  const [error, setError] = useState({
    msg: '',
    status: 'false',
    color: 'red'
  })

  const [isLoading,setLoading] = useState(false)

  //url
  const [path, setPath] = useState("")
  const [desc, setDesc] = useState("")
  const [picvalue, setPicValue] = useState(null)
  const onDrop = useCallback(acceptedFiles => {
    setPicValue(acceptedFiles[0])

    //for image preview
    setPath(URL.createObjectURL(acceptedFiles[0]))

  }, [setPath])

  //for responsive size management of the screen
  //const isNonMobileScreens = useMediaQuery(`(min-width:1000px`)
  //const lowestScreens = useMediaQuery('min-width:430px;max-width:1000px')

  //Global state
  const obj = useSelector(state => state.counterSliceReducer)
  const mode = obj.mode;
  //const { imageUrl } = obj.user;
  const { id } = useParams()
  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false })

  //const [createPostRequest] = useCreatePostRequestMutation()
  //console.log(path,picvalue)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    let res
    if(picvalue)
      res = await uploadFile(picvalue,'Social_Media_posts')
    const data = new FormData()
   
    if(picvalue)
      data.append('postUrl',res.url)
    data.append('userId', id)
    if(desc){
      data.append('description',desc)  
    }
    const posts = await createPostRequest({
      post: data,
      token: obj.token,
    })
    setLoading(false) 
   // console.log(posts)
    if (posts.data.status === 'success') {
    setError({ msg: "Post successfully uploaded", status: true, color: "green" })
    setPicValue(null)
    setPath("")
    setDesc("")
    
    } else {
      setError({ msg: posts.data.message, status: true, color: posts.data.color })
    }

  }
  //for error state
  /* useEffect(() => {
    setTimeout(() => {
      setError({ msg: '', status: false, color: 'red' })
    }, 2000);
  }, [error.status]) */
  useEffect(() => {
    setTimeout(() => {
      setError({ msg: 'Uploading!!Please wait', status: false, color: 'yellow' })
    }, 2000);
  }, [isLoading])

  return (
    <form className={`temp2 temp temp3 CreatePost box-border flex flex-col ${mode === 'light' ? "bg-[white]" : "bg-[#27272a] text-[white]"} w-[90%] `} method='POST' onSubmit={handleSubmit}>
      <div className='one box-border h-[15vh] flex flex-row'>
        <div className="Image w-[15%] flex justify-center items-center h-full pl-[0.5rem]">
          <img src={obj.user.imageUrl} className="rounded-full w-10 h-10 " alt="" />
        </div>
        <div className="Description w-[82%] flex items-center justify-center h-[100%] ">
          <textarea className={` h-[75%] text-[black] w-[90%] ${mode === "dark" ? "bg-[#dfdfdf] placeholder-[#433e3e]" : "bg-[#808080] placeholder-[white] text-[white]"} rounded-xm pt-5 pl-5 resize-none text-[0.9rem] focus:outline-none`} placeholder="What's on your mind?...." name="description" onChange={e => {
            setDesc(e.target.value)
          }} value={desc}/>
        </div>

      </div>
      <div className="dropzone-container  h-[20vh]  rounded-[0.35rem] w-full flex flex-col justify-center mx-auto items-center">

        <div className="h-[75%] w-[90%] box-border border-2 border-dashed border-black rounded-[0.35rem] shadow-[5px_5px_5px_3px_rgba(0,0,0,0.3)] flex justify-center items-center ">
          <input {...getInputProps()} className="postUrl" />
          {
            !picvalue ?
              <p>Add a picture</p>
              : (
                <img src={path} className="h-[90%] w-[35%]" />
              )
          }
        </div>
        <p className={`text-[${error.color}] text-[0.9rem] h-[25%] w-full box-border flex items-center pl-[0.9rem]`}>{error.status ? error.msg : ""}</p>
      </div>
      <div className={`Divider h-[1px] flex justify-center items-center`}>
        <div className="h-full w-[95%] bg-[#808080]"></div>
      </div>
      <div className="Two box-border  h-[10vh] flex flex-row justify-around" >
        <div className="Picture box-border w-[20%]  flex justify-center items-center cursor-pointer" name="picture" onClick={(e) => {
          e.preventDefault()
         
        }}  {...getRootProps()}><AiFillPicture className="h-6 w-6 hover:h-8 hover:w-8" /></div>

        {/*  <div className="Clip box-border w-[20%]  flex justify-center items-center cursor-pointer" name="video" onClick={(e) => {
              e.preventDefault()
              setType(1)
            }} {...getRootProps()}><FaVideo className="h-6 w-6 hover:h-8 hover:w-8 " /></div>
            <div className="Attachment box-border w-[20%]  flex justify-center items-center cursor-pointer " name="document" onClick={(e) => {
              e.preventDefault()
              setType(2)
            }}  {...getRootProps()}><CgAttachment className="h-6 w-6 hover:h-8 hover:w-8" /></div>
            <div className="Audio box-border w-[20%]  flex justify-center items-center cursor-pointer" name="audio" onClick={(e) => {
              e.preventDefault()
              setType(3)
            }}  {...getRootProps()}><AiFillAudio className="h-6 w-6 hover:h-8 hover:w-8 " /></div> */}

        <div className="ButtonParent w-[20%] flex justify-center items-center ">
          <input className="Button h-[60%] w-[76%] bg-[#02c8f5] rounded-full hover:w-[80%] hover:h-[65%] hover:text-[1.1rem] cursor-pointer" type="submit" value="Post" />
        </div>
      </div>
    </form>
  )
}

export default CreatePost