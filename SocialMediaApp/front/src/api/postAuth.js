import axios from "axios";

import { baseUrl } from "utils/newRequest"
const base = baseUrl

export const createPostRequest = async ({ post, token }) => {
    // /console.log(post, token)
    const response = await axios({
        url: `${base}/posts/create`,
        method: 'POST',
        data: post,
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })

    return response
}

export const getAllUserPosts = async () => {
    const response = await axios({
        url: `${base}/posts`,
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    })
    return response;
}

export const deleteUserPost = async (e, postId, postUrl, obj) => {
    // console.log(obj.token)
    // console.log(postId)
    // console.log(postUrl)
    const response = await axios({
        url: base + '/posts/delete',
        method: 'DELETE',
        headers: {
            'authorization': `Bearer ${obj.token}`,
            'Content-Type': 'application/x-www-form-urlencoded',

        },
        data: {
            id: postId,
            postUrl: postUrl
        }
    })
    return response
}

export const handleLikeRequest = async (e, _id, p) => {
    const response = await axios(`${base}/posts/likepost`, {
        method: 'PATCH',
        headers: {

            'Content-Type': 'application/x-www-form-urlencoded',

        },
        data: {
            postId: _id,
            guestId: p.id
        }
    })
    return response
}

export const handleNewComment = async (userId, postId, desc, token) => {
    const response = await axios({
        url: `${base}/posts/makeComment`,
        method: 'POST',
        data: {
            userId,
            postId,
            description: desc
        },
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    //console.log(userId, postId, desc)
    return response
}
export const getComments = async (postId, token) => {
    try {
        const res = await axios({
            url: `${base}/posts/getComments/${postId}`,
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        });
        return res
    } catch (error) {

    }
}

export const deleteComment = async (token, commentId) => {
    const response = await axios({
        url: base + '/posts/deleteComment',
        method: 'DELETE',
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',

        },
        data: {
            commentId
        }
    })
    return response
}