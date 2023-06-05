import UserWidget from 'components/widgets/UserWidget'
import NewUser from 'components/widgets/newUser/NewUser'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'

const Update = () => {
    const obj = useSelector(state => state.counterSliceReducer)
    return (
        <div className={`flex justify-center items-center w-[100%]   ${obj.mode === 'dark' ? 'bg-[black]' : 'bg-[#27272a]'}`}>

            <div className='flex justify-center items-center w-[85%] bg-[rgb(25,25,45)] rounded-lg min-h-[88vh]'>
                <NewUser />
            </div>
        </div>
    )
}

export default Update