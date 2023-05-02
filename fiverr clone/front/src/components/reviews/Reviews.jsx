import React from 'react'
import "./Reviews.scss"
import Review from '../review/Review'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { newRequest } from "../../utils/newRequest.js"
const Reviews = ({ gigId }) => {
    const queryClient = useQueryClient()
    const { isLoading, error, data } = useQuery({

        queryKey: ['reviews'],
        queryFn: () =>
            newRequest.get(`/reviews/${gigId}`).then((res) => {
                return res.data
            })
    })
    //posting a review
    const mutation = useMutation({
        mutationFn: (review) => {
            return newRequest.post('/reviews', review)
        },
        //if adding the review was successful ,then add the new review to the array of reviews
        onSuccess: () => {
            queryClient.invalidateQueries(["reviews"])
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        const desc = e.target[0].value
        const star = e.target[1].value
        mutation.mutate({ gigId, desc, star })
    }
    //console.log(data)
    return (
        <div className="reviews">
            <h2>Reviews</h2>
            {isLoading ? "loading" : error ? error :
                data.map((review) => (
                    <Review
                        key={review._id}
                        review={review} />
                ))
            }

            <div className="add">
                <h3>Add a review</h3>
                <form action="" onSubmit={handleSubmit} className='addForm'>
                    <input type="text" placeholder='write your answer' />
                    <select name="" id="">
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <button>Send</button>
                </form>
            </div>


        </div>
    )
}

export default Reviews