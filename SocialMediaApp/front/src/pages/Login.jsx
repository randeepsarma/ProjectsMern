import { changeMessages, changeMessagesManual, changeToken, changeUser } from "counter/CounterSlice.js";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CssTextField from "components/CssTextField";
//import { useLoginUserMutation } from "counter/userAuthApi";
import { loginUser } from "api/userAuth";

const Login = () => {
  //state management for items in the form
  const [email, setemail] = useState()
  const [password, setpassword] = useState()

  const [error, setError] = useState({
    msg: '',
    status: 'false',
    color: 'red'
  })
  const formRef = useRef()
  const navigate = useNavigate()

  //const [loginUser] = useLoginUserMutation()

  const dispatch = useDispatch()
  const handleSubmit = async (e) => {

    e.preventDefault();
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    if (email && password) {
      //fetch logic
      const response = await loginUser(data);
      //console.log(response)

      if (response.data.status === 'success') {

        //state management to display outcome 
        setError({ msg: 'User login successfull', status: true, color: '#4feb34' })
        //to change token
        //console.log(response.data.numOfUnread)

        dispatch(changeMessagesManual(response.data.numOfUnread))
        dispatch(changeToken({ token: response.data.token }))
        dispatch(changeUser({ user: response.data.user }))

        //formRef.current.reset();
        setTimeout(() => {
          navigate(`/feed/${response.data.user.id}`)
        }, 3000);
      } else {

        setError({ msg: response.data.message, status: true, color: 'red' })

      }

    } else {
      setError({ msg: "All fields are required", status: true, color: 'red' })
    }


  }

  //for error state
  useEffect(() => {
    setTimeout(() => {
      setError({ msg: '', status: false, color: 'red' })
    }, 4000);
  }, [error.status, setError])

  return (
    <>
      <div className={`bg-[white] h-screen`}>
        <form className="flex flex-col justify-center items-center box-border h-full w-full" onSubmit={handleSubmit} ref={formRef}>
          <div className=" flex justify-center items-center flex-col  box-border  h-[60vh] w-[55vw] rounded-2xl shadow-[2px_2px_20px_2px_rgba(0,0,0,0.3)]">
            <CssTextField
              id="outlined-email-input"
              label="Email"
              type="email"
              name="email"
              autoComplete="current-password"
              sx={{
                mx: 'auto',
                mt: 4,
                borderRadius: "0.35rem",
                width: '40vw'
              }}
              onChange={e => setemail(e.target.value)}
              required
              className="bg-[#fafafa] shadow-[5px_5px_5px_3px_rgba(0,0,0,0.3)]"
            />
            <CssTextField
              id="outlined-password-input"
              label="Password"
              type="password"
              name="password"
              onChange={e => setpassword(e.target.value)}
              required
              sx={{

                mx: 'auto',
                mt: 4,
                borderRadius: "0.35rem",
                width: '40vw',

              }}

              className={`bg-[white] shadow-[5px_5px_5px_3px_rgba(0,0,0,0.3)] `}
            />
            <div className="w-[40vw] h-[8vh] shadow-[5px_5px_5px_3px_rgba(0,0,0,0.3)] mt-8">
              <input type="submit" value="Login" className="bg-[#03fcdf] cursor-pointer  box-border w-full h-full rounded-[0.35rem] text-[1.5rem] text-[#2d2d2d] " />
            </div>
            <div className="mt-[1.5rem]"><a href="/register" className=" hover:underline hover:text-[#0e2684]">Dont have an account?Click Here</a></div>
            <p className={` text-[${error.color}] text-[0.9rem] font-bold`}>{error.status ? error.msg : ""}</p>
          </div>
        </form>
      </div>

    </>
  )
}

export default Login