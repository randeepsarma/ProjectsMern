import React from "react";
import { Link } from "react-router-dom";
import "./Messages.scss";
import { newRequest } from "../../utils/newRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment"
const Messages = () => {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    const queryClient = useQueryClient();

    const { isLoading, error, data } = useQuery({

        queryKey: ['conversations'],
        queryFn: () =>
            newRequest.get(`/conversations`).then((res) => {
                return res.data
            })
    })

    const mutation = useMutation({
        mutationFn: (id) => {
            return newRequest.put(`/conversations/${id}`)
        },
        //if adding the review was successful ,then add the new review to the array of reviews
        onSuccess: () => {
            queryClient.invalidateQueries(["conversations"])
        }
    })

    const handleRead = (id) => {
        mutation.mutate(id)
    }
    return (
        <div className="messages">
            {isLoading ? ("loading") : error ? (error) :
                <div className="container">
                    <div className="title">
                        <h1>Messages</h1>
                    </div>
                    <table>
                        <tr>
                            <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                            <th>Last Message</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                        {data.map((c) => (
                            <tr
                                className={
                                    ((currentUser.isSeller && !c.readBySeller) ||
                                        (!currentUser.isSeller && !c.readByBuyer)) ?

                                        "active" : ""}
                                key={c.id}>
                                <td>{currentUser.isSeller ? c.buyerId : c.sellerId}</td>
                                <td>
                                    <Link to={`/message/${c.id}`} className="link">
                                        {c?.lastMessage?.substring(0, 100)}...
                                    </Link>
                                </td>
                                <td>
                                    {moment(c.updatedAt).fromNow()}
                                </td>
                                <td>
                                    {
                                        ((currentUser.isSeller && !c.readBySeller)
                                            ||
                                            (!currentUser.isSeller && !c.readByBuyer))
                                        &&
                                        (
                                            <button onClick={() => handleRead(c.id)} > Mark as Read</button>
                                        )
                                    }

                                </td>
                            </tr>
                        ))}

                        {/* <tr className="active">
                        <td>John Doe</td>

                        <td>
                            <Link to="/message/123" className="link">
                                {message.substring(0, 100)}...
                            </Link>
                        </td>
                        <td>2 hours ago</td>
                        <td>
                            <button>Mark as Read</button>
                        </td>
                    </tr> */}
                        {/*  <tr>
                        <td>Elinor Good</td>
                        <td>
                            <Link to="/message/123" className="link">
                                {message.substring(0, 100)}...
                            </Link>
                        </td>
                        <td>1 day ago</td>
                    </tr>
                    <tr>
                        <td>Garner David </td>
                        <td>
                            <Link to="/message/123" className="link">
                                {message.substring(0, 100)}...
                            </Link>
                        </td>
                        <td>2 days ago</td>
                    </tr>
                    <tr>
                        <td>Troy Oliver</td>
                        <td>{message.substring(0, 100)}</td>
                        <td>1 week ago</td>
                    </tr> */}
                    </table>
                </div>}
        </div >
    );
};

export default Messages;