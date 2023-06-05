import { useSelector } from 'react-redux';

import { Header } from "./Header.jsx"

import Messages from './Messages.jsx';
import SendMessage from './SendMessage.jsx';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

const PartTwo = ({ messages, setMessages, searching, setSearching, activeUsers }) => {
    const obj = useSelector(state => state.counterSliceReducer)
    const { id: convoId } = useParams()
    //console.log(convoId === obj.user.id)
    const isNonConsiderable = useMediaQuery("(min-width:770px)")
    return (
        <div className={` w-[450px] border-box overflow-hidden ${!isNonConsiderable ? "" : "rounded-tr-[15px]"} ${obj.mode === 'dark' ? 'bg-[rgba(25,25,45,0.5)] ' : 'bg-[#dadada] text-[black]'} ${convoId !== obj.user.id ? "" : "flex justify-center items-center"}`}>
            {convoId !== obj.user.id ?
                <>
                    <Header activeUsers={activeUsers} searching={searching} />

                    <Messages messages={messages} setMessages={setMessages} searching={searching} setSearching={setSearching}

                    />
                    <SendMessage messages={messages} setMessages={setMessages} />
                </> :
                <div className={` text-[30px] ${obj.mode === 'dark' ? "text-[white]" : "text-[black]"}`}>Start Messaging</div>
            }

        </div >
    )
}

export default PartTwo