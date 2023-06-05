import React, { useState, useRef, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useNavigate } from "react-router-dom";
import CssTextField from 'components/CssTextField';
//import { useRegisterUserMutation } from 'counter/userAuthApi';
import { registerUser } from 'api/userAuth.js';
const Registration = ({ userData, update }) => {
  const [error, setError] = useState({
    msg: '',
    status: 'false',
    color: 'red'
  })

  //Reference for form element
  const formRef = useRef(null)
  //console.log(userData)
  const [firstname, setfirstName] = useState(update === "update" ? userData?.firstname : '');
  const [lastname, setlastName] = useState(update === "update" ? userData?.lastname : '');
  const [location, setlocation] = useState(update === "update" ? userData?.location : '');
  const [occupation, setoccupation] = useState(update === "update" ? userData?.occupation : '');
  const [picvalue, setPicValue] = useState(update === "update" ? userData?.imageUrl : '')
  const [email, setemail] = useState(update === "update" ? userData?.email : '');
  const [password, setpassword] = useState();
  console.log(picvalue)
  //Function for dropzone image on dropping the image
  const onDrop = (acceptedFiles) => {
    setPicValue(acceptedFiles[0])
    // console.log(acceptedFiles[0].path)
  }
  const navigate = useNavigate()
  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false })
  //const [registerUser] =  useRegisterUserMutation()




  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    if (firstname && lastname && location && email && password && picvalue) {
      data.append('firstname', firstname)
      data.append('lastname', lastname)
      data.append('occupation', occupation)
      data.append('location', location)
      data.append('email', email)
      data.append('password', password)
      data.append('photo', picvalue)

      const response = await registerUser(data)
      if (response.data.status === 'success') {
        setError({ msg: response.data.message, status: true, color: '#4feb34' })
        formRef.current.reset();
        setTimeout(() => {
          navigate('/')
        }, 3000);

      } else {
        setError({ msg: response.data.message, status: true })
      }

    } else {
      setError({ msg: "All fields are required", status: true })
    }


  }

  //for error state
  useEffect(() => {
    setTimeout(() => {
      setError({ msg: '', status: false, color: 'red' })
    }, 2000);
  }, [error.status])

  return (
    <>
      <div className='flex flex-col  h-screen w-full justify-center items-center' >
        <form className=" flex justify-center items-center flex-col  box-border  h-[88vh] w-[55vw] rounded-2xl shadow-[2px_2px_20px_2px_rgba(0,0,0,0.3)] mt-[1rem" onSubmit={handleSubmit} ref={formRef}>
          <CssTextField
            id="outlined-firstname-input"
            label="First Name"
            type="text"
            name="firstname"
            onChange={e => setfirstName(e.target.value)}
            sx={{
              mx: 'auto',
              mt: 2,

              borderRadius: "0.35rem",
              width: '40vw'
            }}
            defaultValue={firstname}
            size="small"
            required
            className="bg-[#fafafa] shadow-[5px_5px_5px_3px_rgba(0,0,0,0.3)]"
          />
          <CssTextField
            id="outlined-lastname-input"
            label="Last Name"
            type="text"
            onChange={e => setlastName(e.target.value)}
            defaultValue={lastname}
            name="lastname"
            size="small"
            sx={{
              mx: 'auto',
              mt: 2,
              borderRadius: "0.35rem",
              width: '40vw'
            }}
            required
            className="bg-[#fafafa] shadow-[5px_5px_5px_3px_rgba(0,0,0,0.3)]"
          />
          <CssTextField
            id="outlined-location-input"
            label="Location"
            type="text"
            name="location"
            size='small'
            onChange={e => setlocation(e.target.value)}
            defaultValue={location}
            sx={{
              mx: 'auto',
              mt: 2,
              borderRadius: "0.35rem",
              width: '40vw'
            }}
            required
            className="bg-[#fafafa] shadow-[5px_5px_5px_3px_rgba(0,0,0,0.3)]"
          />
          <CssTextField
            id="outlined-occupation-input"
            label="Occupation"
            type="text"
            name="occupation"
            onChange={e => setoccupation(e.target.value)}
            defaultValue={occupation}
            size='small'
            sx={{
              mx: 'auto',
              mt: 2,
              borderRadius: "0.35rem",
              width: '40vw'
            }}
            required
            className="bg-[#fafafa] shadow-[5px_5px_5px_3px_rgba(0,0,0,0.3)]"
          />


          <div {...getRootProps()} className="dropzone-container border-[1px] border-[grey] h-10 mt-4 rounded-[0.35rem] w-[73%] shadow-[5px_5px_5px_3px_rgba(0,0,0,0.3)] flex justify-center items-center">
            <input {...getInputProps()} name="photo" />
            {
              !picvalue ?
                <p>Add a picture</p>
                : (
                  <p>{picvalue?.path?.slice(0, 10)}...jpg</p>
                )
            }
          </div>
          <CssTextField
            id="outlined-email-input"
            label="Email"
            type="email"
            name="email"
            autoComplete="current-password"
            onChange={e => setemail(e.target.value)}
            defaultValue={email}
            size='small'
            sx={{
              mx: 'auto',
              mt: 2,
              borderRadius: "0.35rem",
              width: '40vw'
            }}
            required
            className="bg-[#fafafa] shadow-[5px_5px_5px_3px_rgba(0,0,0,0.3)]"
          />
          <CssTextField
            id="outlined-password-input"
            label="Password"
            type="password"
            name="password"
            size='small'
            required
            onChange={e => setpassword(e.target.value)}

            sx={{

              mx: 'auto',
              mt: 2,
              borderRadius: "0.35rem",
              width: '40vw',

            }}

            className={`bg-[white] shadow-[5px_5px_5px_3px_rgba(0,0,0,0.3)] `}
          />
          <div className="w-[40vw] h-[8vh] shadow-[5px_5px_5px_3px_rgba(0,0,0,0.3)] mt-8">
            <input type="submit" value={update === "update" ? "Update" : "Register"} className="bg-[#03fcdf] cursor-pointer  box-border w-full h-full rounded-[0.35rem] text-[1.5rem] text-[#2d2d2d] " />
          </div>
          {update === "update" ? <></> :
            <div className="mt-[1.5rem]"><a href="/" className="text-[12px] flex justify-center hover:underline hover:text-[#0e2684]">Already have an account?Click Here</a>
            </div>}
          <p className={`${error.color === '' ? "text-[red]" : "text-[#00a339e1]"} text-[0.9rem]`}>{error.status ? error.msg : ""}</p>
        </form>
      </div>

    </>
  )
}

export default Registration
