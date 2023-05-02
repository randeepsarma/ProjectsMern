import axios from "axios"


export const registerUser = async (user) => {

    const response = await axios({
        method: 'post',
        url: 'http://localhost:5000/user/register',
        data: user,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })

    return response;
}

export const loginUser = async (user) => {
    const response = await axios({
        method: 'post',
        url: 'http://localhost:5000/user/login',
        data: user,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    return response;
}

export const getUserData = async ({ id }) => {
    const response = axios({
        url: `http://localhost:5000/user/findwithid/${id}`,
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    })
    return response
}

export const handleFriendRequest = async (e, userId, obj, p) => {
    e.preventDefault();


    const response = await axios({
        url: `http://localhost:5000/user/addfriend/${p.id}/${userId}`,
        method: 'PATCH',
        headers: {
            'authorization': `Bearer ${obj.token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    return response;
}