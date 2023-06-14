import axios from "axios"
import { baseUrl } from "utils/newRequest"
const base = baseUrl

export const newConversation = async (users) => {

    const response = await axios({
        method: 'POST',
        url: base + '/conversation/add',
        data: users,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    return response;
}

export const getConversation = async (users) => {
    //console.log(users)
    const response = await axios({
        method: 'POST',
        url: base + '/conversation/get',
        data: users,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    // /console.log(response)
    return response;
}

export const getAllConversations = async (user) => {
    /* const response = await axios({
        method: 'POST',
        url: base + '/conversation/getAll',
        data: users,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }) */
    const response = await axios({
        url: `${base}/conversation/getAll/${user.id}`,
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    })
    //console.log(response)
    return response;
}

export const deleteConversation = async (convoId) => {
    const response = await axios({
        url: base + '/conversation/delete',
        method: 'DELETE',
        headers: {

            'Content-Type': 'application/x-www-form-urlencoded',

        },
        data: {
            convoId
        }
    })
    return response
}