import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import "./Orders.scss"
import { useQuery } from "@tanstack/react-query";
import { newRequest } from '../../utils/newRequest';
const Orders = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const navigate = useNavigate()
    const { isLoading, error, data } = useQuery({

        queryKey: ['orders'],
        queryFn: () =>
            newRequest.get(`/orders`).then((res) => {
                return res.data
            })
    })
    const handleContact = async (order) => {
        const sellerId = order.sellerId;
        const buyerId = order.buyerId;
        const id = sellerId + buyerId;

        try {
            const res = await newRequest.get(`/conversations/single/${id}`);
            navigate(`/message/${res.data.id}`);
        } catch (err) {
            if (err.response.status === 404) {
                const res = await newRequest.post(`/conversations`, {
                    to: currentUser.seller ? buyerId : sellerId,
                });
                navigate(`/message/${res.data.id}`);
            }
        }
    };
    return (
        <div className='orders'>
            {isLoading ? "loading" : error ? error : <div className="container">
                <div className="title">
                    <h1>Orders</h1>
                </div>
                <table>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Contact</th>
                    </tr>

                    {data.map((order) => (
                        <tr key={order._id}>
                            <td>
                                <img
                                    className="image"
                                    src={order.img}
                                    alt="" />
                            </td>
                            <td>{order.title}</td>
                            <td>{order.price}</td>
                            <td>
                                <img
                                    className='delete'
                                    src="/img/message.png"
                                    alt=""
                                    onClick={() => handleContact(order)}
                                />
                            </td>
                        </tr>
                    ))

                    }
                    {/*
                    <tr>
                        <td>
                            <img
                                className="image"
                                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                                alt=""
                            />
                        </td>
                        <td>Ai generated concept art</td>
                        <td>120.<sup>99</sup></td>
                        <td>41</td>
                        <td>
                            <img className="delete" src="./img/message.png" alt="" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img
                                className="image"
                                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                                alt=""
                            />
                        </td>
                        <td>High quality digital character</td>
                        <td>79.<sup>99</sup></td>
                        <td>55</td>
                        <td>
                            <img className="delete" src="./img/message.png" alt="" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img
                                className="image"
                                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                                alt=""
                            />
                        </td>
                        <td>Illustration hyper realistic painting</td>
                        <td>119.<sup>99</sup></td>
                        <td>29</td>
                        <td>
                            <img className="delete" src="./img/message.png" alt="" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img
                                className="image"
                                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                                alt=""
                            />
                        </td>
                        <td>Original ai generated digital art</td>
                        <td>59.<sup>99</sup></td>
                        <td>34</td>
                        <td>
                            <img className="delete" src="./img/message.png" alt="" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img
                                className="image"
                                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                                alt=""
                            />
                        </td>
                        <td>Text based ai generated art</td>
                        <td>110.<sup>99</sup></td>
                        <td>16</td>
                        <td>
                            <img className="delete" src="./img/message.png" alt="" />
                        </td>
                    </tr> 
                    */}
                </table>
            </div>
            }

        </div>
    )
}

export default Orders