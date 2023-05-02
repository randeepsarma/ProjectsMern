import axios from "axios";

export const searchUserInbox = async (letters, token) => {

    const response = await axios({
        url: `http://localhost:5000/message/search?search=${letters}`,
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
        url: 'http://localhost:5000/message/add',
        method: 'POST',
        data: message,
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    return response.data
}

export const getMessages = async (convoId) => {
    //console.log(convoId)
    const response = axios({
        url: `http://localhost:5000/message/get`,
        method: 'POST',
        data: {
            convoId: convoId
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    return response
}