
import { useEffect } from "react"
import { FaMapMarkerAlt } from "react-icons/fa"
import { BsFillBagCheckFill, BsTwitter, BsLinkedin, BsFacebook } from "react-icons/bs"
import { useMediaQuery } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import "../../styles/CommonStyle.css"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import LinearProgress from '@mui/material/LinearProgress';
import { Box, styled } from "@mui/material"
import { CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; import { newConversation } from "api/conversationAuth"
import { getUserData } from "api/userAuth"

const Search = styled(Box)`
    background-color: #008df1;
    border-radius: 50px;
    width : 60%;
    height: 30%;
    padding:2px;
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;


`
const UserDiv = () => {
  const obj = useSelector(state => state.counterSliceReducer)
  const mode = obj.mode;

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  return (
    <div className={`Divider ${isNonMobileScreens ? "h-[0.9%]" : "h-[0.9%]"} flex justify-center items-center`}>
      <div className={`h-full ${isNonMobileScreens ? "w-[91%]" : "w-[95%]"} ${mode === "light" ? "bg-[#808080]" : "bg-[#919191]"}`}></div>
    </div>
  )
}

const UserWidget = ({ profile, userData, setuserData }) => {

  let obj = useSelector(state => state.counterSliceReducer)
  let mode = obj.mode
  let navigate = useNavigate()

  const { id: profileId } = useParams()

  // console.log(userData)

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserData({ id: profileId })

      setuserData(res.data.user)
    }

    fetchData()
  }, [profileId, !obj.user])
  const dispatch = useDispatch()
  const handleMessage = async (e) => {
    e.preventDefault()
    if (profileId != obj.user.id) {
      const res = await newConversation({
        senderId: obj.user.id,
        receiverId: profileId
      })

      setTimeout(() => {

        navigate(`/message/${res.data._id}`)
      }, 1000);
    } else {
      navigate(`/update/${obj.user.id}`)
    }



  }
  const handleProfileJump = (e) => {
    e.preventDefault()
    navigate(`/profile/${obj.user.id}`)
  }
  //console.log(obj.user)
  return (


    <div className={`container  h-[70vh]  temp temp2 temp3 
      box-border  text-[0.8rem] font-bold  ${mode === 'light' ? "bg-[white]" : "bg-[#27272a] text-[white]"} ] mt-[40px] `}>
      <div className="One h-[20%]">
        <div className="Main h-[99%] flex flex-row">
          <div className="box-border Picture h-full w-[20%] flex justify-center items-center cursor-pointer" onClick={handleProfileJump}>
            {!userData ? <CircularProgress /> : <img src={profileId === obj.user.id ? obj.user.imageUrl : userData?.imageUrl} alt="DP" className="h-10 w-10 rounded-full" />}
          </div>
          <div className={`Detail h-full ${profile === "profile" ? "w-[50%]" : "w-[80%]"}   flex flex-col justify-center items-start text-[0.8rem] font-bold`}>
            <div className="Name cursor-pointer" onClick={handleProfileJump}>{profileId === obj.user.id ? obj.user.firstname : userData?.firstname} {profileId === obj.user.id ? obj.user.lastname : userData?.lastname}</div>
            <div className="Friends cursor-pointer" onClick={handleProfileJump}>{profileId === obj.user.id ? Object.keys(obj.user.friends).length : userData ? <>{Object.keys(userData?.friends).length} </> : <LinearProgress color="success" />} Friends</div>
          </div>
          <div className={`${profile === "profile" ? "w-[30%] box-border" : "invisible"} flex justify-center items-center `}>

            <Search onClick={handleMessage} >
              {profileId === obj.user.id ? <EditIcon /> : <></>}
              <span className="text-[100%] ml-[5px] font-thin">{

                profileId === obj.user.id ? "Edit" : "Message"

              }</span>
            </Search>
          </div>

        </div>
        <UserDiv />
      </div>
      <div className="Two h-[20%]">
        <div className="Main h-[99%]">
          <div className="box-border Location h-[50%] flex flex-row">
            <div className="Icon w-[20%] flex justify-center items-center "><FaMapMarkerAlt className="h-[1.4rem] w-[1.4rem] text-[red]" /></div>
            <div className="Icon-Text w-[80%] flex justify-start items-center text-[0.8rem] font-bold">{profileId === obj.user.id ? obj.user.location : userData?.location}</div>
          </div>
          <div className="box-border Occupation h-[50%] flex flex-row">
            <div className="Icon w-[20%] flex justify-center items-center "><BsFillBagCheckFill className="h-[1.4rem] w-[1.4rem] text-[#02eeff]" /></div>
            <div className="Icon-Text w-[80%] flex justify-start items-center text-[0.8rem] font-bold">{profileId === obj.user.id ? obj.user.occupation : userData?.occupation}</div>
          </div>
        </div>
        <UserDiv />
      </div>
      <div className="Three h-[20%]">
        <div className="Main h-[99%]">
          <div className="ProfileVists box-border  h-[50%] flex flex-row text-[0.8rem] font-bold ">
            <div className="Text w-[75%] flex  items-center pl-[2rem]">Profile Visits</div>
            <div className="Number w-[25%] flex justify-center items-center ">1011</div>
          </div>
          <div className="Post Impressions box-border  h-[50%] flex flex-row text-[0.8rem] font-bold">
            <div className="Text w-[75%] flex  items-center pl-[2rem]">Post Impressions</div>
            <div className="Number w-[25%] flex justify-center items-center ">1011</div>
          </div>
        </div>
        <UserDiv />
      </div>
      <div className="Four h-[40%]">
        <div className="Heading h-[25%] flex text-[0.9rem] justify-start items-center pl-[2rem]">Social Media</div>
        <div className="Profiles h-[60%]">
          <div className="Twitter flex flex-row h-[33%]">
            <div className="w-[20%] flex justify-center items-center">
              <BsTwitter className="text-[#2982fe] h-[1.4rem] w-[1.4rem]" />
            </div>
            <a href="https://twitter.com/Twitter?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" className="flex items-center w-[80%] hover:text-[1rem] hover:text-[light-blue]">Twitter</a>
          </div>
          <div className="Linkedin flex flex-row h-[33%]">
            <div className="w-[20%] flex justify-center items-center">
              <BsLinkedin className="text-[#2982fe] h-[1.4rem] w-[1.4rem]" />
            </div>
            <a href="https://twitter.com/Twitter?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" className="flex items-center w-[80%] hover:text-[1rem] hover:text-[light-blue]">Linkedin</a>
          </div>
          <div className="FaceBook flex flex-row h-[33%]">
            <div className="w-[20%] flex justify-center items-center">
              <BsFacebook className="text-[#2982fe] h-[1.4rem] w-[1.4rem]" />
            </div>
            <a href="https://twitter.com/Twitter?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" className="flex items-center w-[80%] hover:text-[1rem] hover:text-[light-blue]">Facebook</a>
          </div>

        </div>
      </div>
    </div>


  )
}

export default UserWidget