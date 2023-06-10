import {useState,useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { uploadFile } from 'utils/newRequest'
import { changeUser } from 'counter/CounterSlice'
import { updateProfilePicture } from 'api/userAuth'
import "./ComnStyle.css"
 
const ChangeDisplay = ({globalCheck,setglobalCheck}) => {
  const obj= useSelector(state=>state.counterSliceReducer)
  const [path, setPath] = useState("")
  
  const [picvalue, setPicValue] = useState(null)
  const onDrop = useCallback(acceptedFiles => {
    setPicValue(acceptedFiles[0])

    //for image preview
    setPath(URL.createObjectURL(acceptedFiles[0]))

  }, [setPath])
  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false })
  const dispatch=useDispatch()

  const handlePicture =async(e)=>{
     e.preventDefault();
     //console.log('hey')
     if(globalCheck===false){
     
     const res = await uploadFile(picvalue,'Social_Media_dp')
     
     const data = new FormData()
     data.append('NewImageUrl',res.url)
      dispatch(changeUser({
      user:{
      ...obj.user,
      imageUrl:res.url
     }})) 
     data.append('OldImageUrl',obj.user.imageUrl)
     data.append('userId',obj.user.id)
     const response =await updateProfilePicture(obj.token,{
      NewImageUrl:res.url,
      OldImageUrl:obj.user.imageUrl,
      userId:obj.user.id
     })

  setPicValue(null)
  setPath("")
  //console.log(response) 
    }
  }
 // console.log(obj.user.imageUrl)
    return (
    <div className={`${obj.mode === 'light' ? "bg-[white]" : "bg-[#27272a] text-[white]"} w-[70%] rounded-lg box-border mb-[10px] h-[80px] flex flex-row justify-between items-center tep tep2 tep3`} >
      <input {...getInputProps()}  />
        <img src={!picvalue?obj.user.imageUrl:path } className='h-[50px] w-[50px] rounded-[50%] ml-5'  />
        <button className='h-[35px] w-[70px] bg-[#1b85ff] hover:bg-[#3f98fe] text-[10px] rounded-md text-[white] ml-[5px]' {...getRootProps()} >Change</button>
        <button className={`h-[35px] w-[70px] bg-[purple] hover:bg-[#fc58fc] text-[10px] rounded-md text-[white] ml-[5px] ${picvalue?"":"invisible"} mr-5`} onClick={handlePicture}>Update</button>
    </div>
  )
}

export default ChangeDisplay