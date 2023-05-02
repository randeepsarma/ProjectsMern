import React, { useState, useEffect } from 'react'
import "./Pay.scss"
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { newRequest } from "../../utils/newRequest"
import { useLocation, useParams } from "react-router-dom"
import CheckoutForm from '../../components/checkoutForm/CheckoutForm';
const stripePromise = loadStripe("pk_live_51N17DqSDCMPhPh85rx6C9nH1zxz1i6Y8C9CsQ8vMD9lCaRGMOSKtwXh69RAxjy3zBoUNJBfarEG4NsIbFWVMygIS000PQZFQjG");

const Pay = () => {
    const [clientSecret, setClientSecret] = useState("");
    const { id } = useParams()
    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await newRequest.post(`/orders/create-payment-intent/${id}`)
                setClientSecret(res.data.clientSecret)
            } catch (error) {
                console.log(error)
            }
        }
        makeRequest()
    }, [])
    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };
    return (
        <div className='pay'>
            {
                clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )
            }
        </div>
    )
}

export default Pay