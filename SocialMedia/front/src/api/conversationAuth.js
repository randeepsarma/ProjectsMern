import axios from "axios"


export const newConversation = async (users) => {

    const response = await axios({
        method: 'POST',
        url: 'http://localhost:5000/conversation/add',
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
        url: 'http://localhost:5000/conversation/get',
        data: users,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    // /console.log(response)
    return response;
}

export const getAllConversations = async (users) => {
    const response = await axios({
        method: 'POST',
        url: 'http://localhost:5000/conversation/getAll',
        data: users,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    //console.log(response)
    return response;
}

export const deleteConversation = async (convoId) => {
    const response = await axios({
        url: 'http://localhost:5000/conversation/delete',
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