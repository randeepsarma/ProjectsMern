import axios from "axios"
import { baseUrl } from "utils/newRequest"
const base = baseUrl

export const registerUser = async (user) => {

    const response = await axios({
        method: 'post',
        url: base + '/user/register',
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
        url: base + '/user/login',
        data: user,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    return response;
}

export const getUserData = async ({ id }) => {
    const response = axios({
        url: `${base}/user/findwithid/${id}`,
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
        url: `${base}/user/addfriend/${p.id}/${userId}`,
        method: 'PATCH',
        headers: {
            'authorization': `Bearer ${obj.token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    return response;
}

export const updateDetails = async(userId,token,desc,num)=>{
    const response = await axios({
        url: `${base}/user/update`,
        method: 'PATCH',
        data:{
          userId,
          val: desc,
          num:num,
        },
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        
    })
    return response
}

export const updateProfilePicture =async(token,data)=>{
    const response = await axios({
        url: `${base}/user/deleteImage`,
        method: 'PATCH',
        data,
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        
    }) 
    
    return response
     
}