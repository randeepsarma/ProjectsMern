import React, { useState, useEffect } from 'react'
import { styled, Box, Avatar } from '@mui/material'
import pic1 from "images/dp.jpg"
import { searchUserInbox } from 'api/messageAuth'
import { useSelector, useDispatch } from 'react-redux'
import ListIcon from '@mui/icons-material/List';
import { changeConvoId, changePerson } from 'counter/CounterSlice'
import { getConversation, getAllConversations, newConversation, deleteConversation } from 'api/conversationAuth'
import styles from '../../../../styles/PartOne.module.css'
const ConvoWidget = ({ user, switchSearch }) => {
    const dispatch = useDispatch()
    const obj = useSelector(state => state.counterSliceReducer)
    //console.log(user)
    const resKeys = !switchSearch ? Object.keys(user.details).filter(id => id !== obj.user.id) : "";




    const handlePerson = async (e) => {
        e.preventDefault()

        //setting the inbox to be displayed
        if (switchSearch) {


            //console.log(convo)
            dispatch(changePerson({
                person: {
                    name: user.firstname + " " + user.lastname,
                    imageUrl: user.imageUrl,
                    id: user._id
                }
            }))
            //console.log(convo)
        } else {



            dispatch(changePerson({
                person: {
                    name: user.details[resKeys].name,
                    imageUrl: user.details[resKeys].imageUrl,
                    id: resKeys[0]
                }


            }))
            dispatch(changeConvoId({ id: user._id }))
            //console.log(convo)

        }


    }

    //console.log(user.details[resKeys])

    return (
        <div className={`ConvoHighlight h-[80px]  flex flex-row  ${obj.mode === 'dark' ? 'bg-[#27272a] text-[white]' : 'bg-[#dadada]'}   cursor-pointer hover:bg-[grey]`} onClick={handlePerson}>
            <div className='One w-[20%] h-[100%] box-border flex justify-center items-center'>
                <Avatar src={switchSearch ? user.imageUrl : user.details[resKeys].imageUrl} sx={{
                    height: 50,
                    width: 50
                }} />
            </div>
            <div className='Two flex flex-col justify-center items-start w-[55%]  text-[0.9rem] pl-2'>
                <div className='Name '>{switchSearch ? <> {user.firstname} {user.lastname}</> : user.details[resKeys].name}</div>
                <div className='Message text-[0.8rem]'>{!switchSearch ? user.message : ""}</div>


            </div>
            <div className='Three flex w-[25%] border-black box-border justify-center items-center text-[0.8rem] font-semibold'>
                <div>

                </div>
            </div>
        </div>
    )
}
/* const ConvoWidget2 = ({ user, switchSearch }) => {
    const dispatch = useDispatch()
    const obj = useSelector(state => state.counterSliceReducer)
    //console.log(user)
    const resKeys = !switchSearch ? Object.keys(user.details).filter(id => id !== obj.user.id) : "";

    const handlePerson = async (e) => {
        e.preventDefault()

        //setting the inbox to be displayed
        if (switchSearch) {
            const convo = await newConversation({
                senderId: obj.user.id,
                receiverId: user._id
            })
            dispatch(changePerson({
                person: {
                    name: user.firstname + " " + user.lastname,
                    imageUrl: user.imageUrl,

                }
            }))
            //console.log(convo)
        } else {
            console.log(user)
            const convo = await newConversation({
                senderId: obj.user.id,
                receiverId: resKeys[0]
            })
            dispatch(changePerson({
                person: {
                    name: user.details[resKeys].name,
                    imageUrl: user.details[resKeys].imageUrl
                }

            }))
            //console.log(convo)

        }


    }

    //console.log(user.details[resKeys])

    return (
        <div className='ConvoHighlight h-[80px]  flex flex-row bg-[#dadada]   cursor-pointer hover:bg-[grey]' onClick={handlePerson}>
            <div className='One w-[20%] h-[100%] box-border flex justify-center items-center'>
                <Avatar src={switchSearch ? user.imageUrl : user.details[resKeys].imageUrl} sx={{
                    height: 55,
                    width: 55
                }} />
            </div>
            <div className='Two flex flex-col justify-center items-start w-[55%]  text-[0.9rem] pl-2'>
                <div className='Name '>{switchSearch ? <> {user.firstname} {user.lastname}</> : user.details[resKeys].name}</div>
                <div className='Message text-[0.8rem]'>{!switchSearch ? user.message : ""}</div>


            </div>
            <div className='Three flex w-[25%] border-black box-border justify-center items-center text-[0.8rem] font-semibold'>
                <div>

                </div>
            </div>
        </div>
    )
} */

const Component = styled(Box)`
    height: 92%;
    overflow-y: scroll;


`


const PartOne = ({ convoId, conversations, switchSearch, setswitchSearch }) => {
    //console.log(conversations)
    const [searchVal, setSearchVal] = useState('')
    const [searchUsers, setSearchUsers] = useState([])

    const dispatch = useDispatch()
    const handleChange = async (e) => {
        e.preventDefault();
        if (e.target.value === "") {
            setswitchSearch(false)
            // dispatch(changePerson({ person: null }))
        }
        setSearchVal(e.target.value)



    }
    const obj = useSelector(state => state.counterSliceReducer)
    //console.log(obj)
    const sendText = async (e) => {
        const code = e.keyCode || e.which

        if (searchVal === "") {
            setswitchSearch(false)
            return
        }
        if (code === 13) {
            if (searchType === "Present Conversations") {
                const users = await searchUserInbox(searchVal, obj.token)
                setSearchUsers(users.data)
                setswitchSearch(true)
            }
        }
    }
    //console.log(conversations)

    let resKeys = []
    const [searchType, setSearchType] = useState("Start New Conversation")
    const [checkList, setcheckList] = useState(true)
    return (
        <div className={`mt-[12vh] w-[350px] border-box  overflow-hidden border-black  ${obj.mode === 'dark' ? 'bg-[#27272a]' : 'bg-[#dadada]'}`}>
            <div className={`Search h-[8%] border-box  flex justify-center items-center ${styles.parentType}`}>

                <input
                    type="text" className={`border-box bg-[#b6b6b6] rounded-[2px] h-[80%] w-[60%] p-2 placeholder-[blue] `} placeholder='Search...'
                    value={searchVal}
                    onChange={(e) => handleChange(e)}
                    onKeyPress={(e) => sendText(e)}


                ></input>
                <div className='relative h-[80%] bg-[#b6b6b6] flex justify-center items-center hover:bg-[grey] cursor-pointer' onClick={() => {
                    setcheckList(prev => !prev)
                }} >
                    <ListIcon className="" />
                </div>
                <div className={`${styles.searchType} cursor-pointer ${checkList ? "hidden" : ""}`} onClick={() => {
                    setSearchType(prev => prev === 'Present Conversations' ? 'Start New Conversation' : "Present Conversations")
                    setcheckList(prev => !prev)
                }}>
                    {searchType}
                </div>



            </div>
            <Component>
                {
                    switchSearch && (
                        searchUsers.length > 0 && searchUsers.map((user) => {

                            return <ConvoWidget key={user._id} user={user} convoId={convoId} switchSearch={switchSearch} />
                        }))
                }
                <div className={`${searchType === 'Present Conversations' ? 'hidden' : ""}`}>
                    {
                        !switchSearch && (conversations && conversations.map((user) => {

                            return <ConvoWidget key={user._id} user={user} convoId={convoId} resKeys={resKeys} switchSearch={switchSearch} />
                        }))
                    }
                </div>

            </Component>
        </div>
    )
}

export default PartOne