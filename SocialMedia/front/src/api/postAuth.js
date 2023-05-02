import axios from "axios";



export const createPostRequest = async ({ post, token }) => {
    // /console.log(post, token)
    const response = await axios({
        url: 'http://127.0.0.1:5000/posts/create',
        method: 'POST',
        data: post,
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    console.log(response.data)
    return response
}

export const getAllUserPosts = async () => {
    const response = await axios({
        url: 'http://localhost:5000/posts',
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    })
    return response;
}

export const deleteUserPost = async (e, postId, postUrl, obj) => {
    console.log(obj.token)
    console.log(postId)
    console.log(postUrl)
    const response = await axios({
        url: 'http://localhost:5000/posts/delete',
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
    const response = await axios(`http://localhost:5000/posts/likepost`, {
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