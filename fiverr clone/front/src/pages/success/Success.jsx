import React from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import { newRequest } from "../../utils/newRequest"
const Success = () => {
    const { search } = useLocation()
    const navigate = useNavigate()
    const params = new URLSearchParams(search)
    const payment_intent = params.get("payment_intent")
    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await newRequest.put("/orders", { payment_intent })
                // /console.log(res)
                setTimeout(() => {
                    navigate("/orders")
                }, 5000);

            } catch (error) {
                console.log(error)
            }
        }
        makeRequest()
    }, [])

    return (
        <div>Payment Successful.You will be directed to orders page please do not close the page</div>
    )
}

export default Success