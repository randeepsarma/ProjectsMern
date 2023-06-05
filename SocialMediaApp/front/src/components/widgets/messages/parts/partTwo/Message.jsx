import React from 'react'
import { styled, Box, Avatar, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
const Own = styled(Box)`
  background: #3477eb;
  max-width:90%;
  margin-left:auto;
  padding:10px;
  margin-bottom:10px;
  width:fit-content;
  color:white;
  font-size:0.8rem;
  display:flex;
  border-radius:10px 0px 10px 10px;
  word-break:break-word;
`
const Wrapper = styled(Box)`
   background: #2c2c2c;
  max-width:90%;
  margin-right:auto;
  padding:10px;
  margin-bottom:10px;
  width:fit-content;
  color:white;
  font-size:0.8rem;
  display:flex;
  border-radius:0px 10px 10px 10px;
  word-break:break-word;   
     

`
const Time = styled(Typography)`
    font-size: 10px;
    font-weight:bold;

    
    margin-top:6px;
    word-break: keep-all;
    margin-top:auto;
`

const Message = ({ item }) => {

    const { id: convoId } = useParams()
    const obj = useSelector(state => state.counterSliceReducer)


    //console.log(item)
    return (
        <div>
            {
                convoId === item?.conversationId ?
                    item?.sender !== obj.user.id ?

                        <div className={`flex flex-row w-[100%]`}>
                            <Avatar src={obj.presentMessagePerson.imageUrl} className='mr-2' />
                            <Wrapper>
                                {item?.text}
                            </Wrapper>
                        </div>
                        :
                        <div className="flex flex-row w-[100%] -z-40">

                            <Own>
                                {item?.text}

                            </Own>
                            <Avatar src={obj.user.imageUrl} className='ml-2' />
                        </div>
                    : <></>

            }
        </div >
    )
}

export default Message