import { useSelector } from "react-redux"
import { Avatar } from '@mui/material'
import { useEffect } from "react";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useState } from "react";
import { CircularProgress } from '@mui/material';

export const Header = ({ activeUsers, searching }) => {
    const obj = useSelector(state => state.counterSliceReducer)
    const [count, setcount] = useState(false)
    useEffect(() => {
        const funct = () => {
            let val = activeUsers.filter(uid => uid === obj.presentMessagePerson.userId).length
            setcount(val)
        }
        funct()
    }, [activeUsers])


    //console.log(i)
    //console.log(activeUsers.filter(uid => uid === obj.presentMessagePerson.userId))
    //console.log(activeUsers)

    //console.log(obj.presentMessagePerson)
    return (

        <div className="bg-[rgb(25,25,45)] h-[11%]  flex flex-row w-[100%]">

            {searching ? <CircularProgress color="success" className='h-[50%] w-[50%]' /> :
                <>
                    <div className="One w-[25%] box-border  h-[100%] flex justify-center items-center">
                        <Avatar src={obj.presentMessagePerson?.imageUrl} alt="dp" />
                    </div>
                    <div className="Two w-[65%] box-border  h-[100%]  text-[white] flex justify-center flex-col">
                        <div className="Name text-[15px]">{obj.presentMessagePerson?.firstname} {obj.presentMessagePerson?.lastname}</div>

                        {/* <div className="status text-[12px]
                flex items-center"><FiberManualRecordIcon className={`${count > 0 ? "text-[green]" : "text-[red]"} text-[]`} sx={{
                        height: '15px',
                        width: '15px'
                    }} />{count > 0 ? "Online" : "Offline"}
                </div> */}
                    </div>
                </>}
            <div className="Three text-[white] flex items-center -rotate-90 h-[100%] ">
                <p className="text-[25px] cursor-pointer">...</p>
            </div>

        </div>
    )
}