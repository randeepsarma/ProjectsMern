import {useState,useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { uploadFile } from 'utils/newRequest'
import { changeUser } from 'counter/CounterSlice'
import { updateProfilePicture } from 'api/userAuth'
import "./ComnStyle.css"
import {  getStorage, ref, deleteObject , uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {storage} from "../../../firebase.js"
const ChangeDisplay = ({globalCheck,setglobalCheck}) => {
  const obj= useSelector(state=>state.counterSliceReducer)
  const [path, setPath] = useState("")
  
  const [picvalue, setPicValue] = useState('')
  const onDrop = useCallback(acceptedFiles => {
    setPicValue(acceptedFiles[0])

    //for image preview
    setPath(URL.createObjectURL(acceptedFiles[0]))

  }, [setPath])
  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false })
  const dispatch=useDispatch()
//console.log(obj.user.imageUrl)
  //console.log(globalCheck)
  const upload = (items)=>{
    //console.log(items)
    items.forEach((item)=>{
      const filename = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage,`/Social_Media_dp/${filename}`);
      const uploadTask = uploadBytesResumable(storageRef,item.file);
      uploadTask.on("state_changed",snapshot=>{
         const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
         console.log("Upload is "+progress+"% done") 
      },(err)=>{console.log(err)},()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(async(url)=>{
          //console.log(url)
     const data = new FormData()
     data.append('NewImageUrl',url)

     dispatch(changeUser({
      user:{
      ...obj.user,
      imageUrl:url
     }})) 
     
     data.append('userId',obj.user.id)
     const response =await updateProfilePicture(obj.token,data)

     setPicValue(null)
     setPath("")
        })
      });
    }) 
  }
  const handlePicture =async(e)=>{
     e.preventDefault();
     //console.log('hey')
     if(globalCheck===false){
      const oldUrl = obj.user.imageUrl
      upload([{file:picvalue,label:"post"}])
      //deleteImageLogic
      const arr = oldUrl.split("/")[7].split("?")[0].split("%")
      const url = `${arr[0]}/${arr[1].slice(2)}` 
      const desertRef = ref(storage,`/${arr[0]}/${arr[1].slice(2)}`);
      //Delete the file
      deleteObject(desertRef).then(() => {
        //console.log('Done')
      }).catch((error) => {
        console.log(error)
      }); 
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