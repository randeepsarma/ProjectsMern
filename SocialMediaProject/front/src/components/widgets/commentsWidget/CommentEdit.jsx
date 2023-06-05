import { useState } from 'react'

import { useSelector } from 'react-redux'
import SendIcon from '@mui/icons-material/Send';
import "./comment.css"
import { handleNewComment } from 'api/postAuth';


const CommentEdit = ({ postId, setComments, setcommentCount, setcheckComments }) => {

    const obj = useSelector(state => state.counterSliceReducer)
    const [desc, setDesc] = useState("")
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        if (desc != "") {
            setcommentCount(prev => prev + 1)
            const res = await handleNewComment(obj.user.id, postId, desc, obj.token)
            setDesc("")
            setComments(prev => [...prev, res.data])
            setcheckComments(prev => !prev)
        }
    }
    return (
        <form className='h-[80px] w-[100%]  box-border flex flex-row justify-around ' >

            <img src={obj.user.imageUrl} className='h-[40px] w-[40px] rounded-[50%] mt-[5px] ml-[1px]' />

            <div className={`flex flex-row justify-center items-center box-border bg-[#d5d3d3] placeholder-[black]"  w-[85%] h-[80%] br-Class`}>
                <textarea className={` text-[black] w-[80%]  pt-5 pl-5 resize-none text-[0.9rem] focus:outline-none bg-[#d5d3d3] placeholder-opacity-70 placeholder-[black] `} placeholder="Post a comment" name="description" value={desc} onChange={e => {
                    setDesc(e.target.value)
                }} />
                <SendIcon className='text-[black] cursor-pointer hover:bg-navbar-bg hover:rounded-[50%] p-2' sx={{
                    height: 40,
                    width: 40
                }} onClick={handleFormSubmit} />
            </div>
        </form>
    )
}

export default CommentEdit