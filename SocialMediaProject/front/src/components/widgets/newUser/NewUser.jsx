import { useState, useEffect, useCallback } from 'react'
import "./newUser.css"
import CssTextField from 'components/CssTextField';
import { useDropzone } from 'react-dropzone'
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

const Component = ({ item }) => {
    // console.log(item)
    return (
        <>
            <div className="newUserItem  text-[black] flex  items-center flex-col h-[40px]  w-[300px]">
                <label className='text-[white] max-w-[300px] h-[20px] flex '>{item.labelled}</label>
                <div className='flex flex-row max-w-[300px] h-[20px] '>
                    <input type="checkbox" name="" id="" />
                    <input
                        id="outlined-lastname-input"
                        label="Location"
                        type="text"
                        name={item.name}
                        onChange={e => item.setVariable(e.target.value)}

                        defaultValue={item.variable}

                        required
                        className="bg-[#fafafa] shadow-[5px_5px_5px_3px_rgba(0,0,0,0.3)] max-w-[300px]  h-[20px]"
                    />

                </div>
            </div>
        </>
    )
}
const NewUser = ({ profile }) => {

    const obj = useSelector(state => state.counterSliceReducer)
    const [firstname, setfirstName] = useState(obj.user ? obj.user.firstname : '');
    const [lastname, setlastName] = useState(obj.user ? obj.user.lastname : '');
    const [location, setlocation] = useState(obj.user ? obj.user.location : '');
    const [occupation, setoccupation] = useState(obj.user ? obj.user.occupation : '');

    const [password, setpassword] = useState();
    const [email, setemail] = useState(obj.user ? obj.user.email : '');


    const arr = [
        {
            variable: firstname,
            setVariable: setfirstName,
            name: "firstname",
            labelled: "First Name"
        },
        {
            variable: lastname,
            setVariable: setlastName,
            name: "lastname",
            labelled: "Last Name"
        },
        {
            variable: location,
            setVariable: setlocation,
            name: "location",
            labelled: "Location"
        },
        {
            variable: occupation,
            setVariable: setoccupation,
            name: "occupation",
            labelled: "Occupation"
        },
        {
            variable: email,
            setVariable: setemail,
            name: "email",
            labelled: "Email"
        },
        {
            variable: password,
            setVariable: setpassword,
            name: "password",
            labelled: "Password"
        },
    ]
    const [path, setPath] = useState("")
    const [picvalue, setPicValue] = useState(null)
    const onDrop = useCallback(acceptedFiles => {
        setPicValue(acceptedFiles[0])

        //for image preview
        setPath(URL.createObjectURL(acceptedFiles[0]))

    }, [setPath])
    const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false })

    console.log(path)
    return (
        <div className="newUser flex flex-col justify-center items-center">
            <h1 className={`newUserTitle flex justify-center items-center font-bold text-[2rem] font-serif text-[white] mb-[20px]`}>Profile Update</h1>

            <div className="h-[200px] w-[200px] box-border rounded-[0.35rem] shadow-[5px_5px_5px_3px_rgba(0,0,0,0.3)] flex justify-center items-center " >
                <input {...getInputProps()} className="postUrl" />
                {

                    <img src={picvalue ? path : obj.user.imageUrl} className="h-[200px] w-[200px] rounded-lg" />

                }
            </div>
            <button className='bg-[#0062ff] h-[40px] max-w-[300px] p-2 text-[white] mt-[1rem] rounded-lg' {...getRootProps()}><InsertPhotoIcon /><span className='ml-[4px]'>Change Picture</span></button>
            <form className="newUserForm flex flex-col justify-center items-center">
                <div className='flex items-center flex-row grid-rows-3 flex-wrap justify-center'>
                    {
                        arr.map((item, id) => (
                            <Component key={id} item={item} />
                        ))
                    }
                </div>


                <input type="submit" value="Submit" name="submit" className='bg-[#00bbff] h-[40px]  w-[400px] rounded-lg mt-[2rem]' />

            </form >
        </div >
    )
}

export default NewUser