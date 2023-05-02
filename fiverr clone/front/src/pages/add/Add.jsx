import React, { useState, useReducer } from 'react'
import "./Add.scss"
import { gigReducer, INITIAL_STATE } from '../../reducers/gigReducer'
import { upload } from "../../utils/upload"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { newRequest } from "../../utils/newRequest.js"
import { useNavigate } from "react-router-dom"
const Add = () => {
    const [singleFile, setSingleFile] = useState(undefined)
    const [files, setFiles] = useState([])
    const [uploading, setUploading] = useState(false)

    const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE)

    const handleChange = (e) => {
        e.preventDefault()
        let v = e.target.value
        console.log(e.target.name)
        dispatch({
            type: "CHANGE_INPUT",
            payload: {
                name: e.target.name,
                value: String(v)
            }
        })
    }
    const handleFeature = (e) => {
        e.preventDefault()
        dispatch({
            type: "ADD_FEATURE",
            payload: e.target[0].value,
        })
        e.target[0].value = ""
    }
    const handleUpload = async (e) => {
        e.preventDefault()
        setUploading(true)
        try {
            const cover = await upload(singleFile)
            const images = await Promise.all(
                [...files].map(async (file) => {
                    const url = await upload(file);
                    return url
                })
            )
            setUploading(false)
            dispatch({ type: "ADD_IMAGES", payload: { cover, images } });

        } catch (error) {
            console.log(error)
        }
    }

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    //posting a review
    const mutation = useMutation({
        mutationFn: (gig) => {
            return newRequest.post('/gigs', gig)
        },
        //if adding the review was successful ,then add the new review to the array of reviews
        onSuccess: () => {
            queryClient.invalidateQueries(["myGigs"])
        }
    })
    console.log(state)
    const handleSubmit = (e) => {
        e.preventDefault()
        mutation.mutate(state)
        //    navigate("/mygigs")
    }
    return (
        <div className='add'>
            <div className="container">
                <h1>Add New Gig</h1>
                <div className="sections">
                    <div className="left">
                        <label htmlFor="">Title</label>
                        <input type="text" placeholder="e.g. I will do something I'm really good at" name="title" onChange={handleChange} />
                        <label htmlFor="">Category</label>
                        <select name="cat" id="cat" onChange={handleChange}>
                            <option value="design">Design</option>
                            <option value="web">Web Development</option>
                            <option value="animation">Animation</option>
                            <option value="music">Music</option>
                        </select>
                        <div className="images">
                            <div className="imagesInputs">
                                <label htmlFor="">Cover Image</label>
                                <input
                                    type="file"
                                    onChange={e => setSingleFile(e.target.files[0])} />
                                <label htmlFor="" >Upload Images</label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={e => setFiles(e.target.files)} />
                            </div>
                            <button onClick={handleUpload}>{uploading ? "uploading" : "Upload"}</button>
                        </div>
                        <label htmlFor="">Description</label>
                        <textarea
                            name="desc"
                            id=""
                            cols="30"
                            rows="16"
                            placeholder="Brief descriptions to introduce your service to customer"
                            onChange={handleChange}
                        ></textarea>
                        <button onClick={handleSubmit}>Create</button>
                    </div>
                    <div className="right">
                        <label htmlFor="">Service Title</label>
                        <input type="text" name="shortTitle" placeholder="e.g. One-page web design" onChange={handleChange} />
                        <label htmlFor="">Short Description</label>
                        <textarea name="shortDesc" onChange={handleChange} id="" cols="30" rows="10" placeholder='Short description of your service'></textarea>
                        <label htmlFor="">Delivery Time(e.g. 3days)</label>
                        <input type="number" min={1} onChange={handleChange} name="deliveryTime" />
                        <label htmlFor="">Revision Number</label>
                        <input type="number" min={1} onChange={handleChange} name="revisionNumber" />
                        <label htmlFor="">Add Features</label>
                        <form action="" onSubmit={handleFeature} className='add'>
                            <input type="text" placeholder='e.g. page design' />
                            <button type='submit'>Add</button>
                        </form>
                        <div className="addedFeatures">
                            {state?.features?.map(f => (
                                <div className="item" key={f}>
                                    <button onClick={() => dispatch({
                                        type: "REMOVE_FEATURE",
                                        payload: f
                                    })}>{f}
                                        <span>X</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <label htmlFor="">Price</label>
                        <input type="number" onChange={handleChange} name="price" />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add