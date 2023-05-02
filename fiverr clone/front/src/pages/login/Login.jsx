import React, { useState } from 'react'
import "./Login.scss"
import { newRequest } from '../../utils/newRequest'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const [username, setUsername] = useState("")
    const [Password, setPassword] = useState("")
    const [Error, setError] = useState(null)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await newRequest.post("/auth/login", { username, Password })
            localStorage.setItem("currentUser", JSON.stringify(res.data))
            navigate("/")
            // console.log(res.data)
        } catch (error) {
            setError(error.response.data)
        }
    }
    return (
        <div className="login">
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="">Username</label>
                <input type="text" name="username" placeholder='john doe' onChange={e => setUsername(e.target.value)} />
                <label htmlFor="">Password</label>
                <input type="password" onChange={e => setPassword(e.target.value)} name="password" />
                <button type='submit'>Login</button>
                {Error && Error}
            </form>
        </div>
    )
}

export default Login