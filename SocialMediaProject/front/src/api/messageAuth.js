import axios from "axios";

import { baseUrl } from "utils/newRequest"
const base = baseUrl

export const searchUserInbox = async (letters, token) => {

    const response = await axios({
        url: `${base}/message/search?search=${letters}`,
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    })
    return response;

}

export const newMessage = async (message, token) => {
    //console.log(message, token)
    console.log(message)
    const response = await axios({
        url: `${base}/message/add`,
        method: 'POST',
        data: message,
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    return response.data
}

export const getMessages = async (convoId, token) => {
    //console.log(convoId)
    const res = await axios({
        url: `${base}/message/get/${convoId}`,
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    });
    return res
}

export const changeRead = async (userId, token) => {

    const res = await axios({
        url: base + "/message/updateRead",
        method: 'PUT',
        data: {
            userId,
        },
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    return res;
}
