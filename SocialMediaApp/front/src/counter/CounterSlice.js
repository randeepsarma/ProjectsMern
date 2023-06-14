import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    mode: "dark",
    token: null,
    user: null,
    presentMessagePerson: null,
    // convoId: null,
    messagesCount: 0,
    alertMessages: false,

}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        /*  changeConvoId: (state, action) => {
             state.convoId = null
         }, */
        changeTheme: (state) => {
            state.mode = state.mode === "dark" ? "light" : "dark"
        },
        changeToken: (state, action) => {

            state.token = state.token ? null : action.payload.token;
        },
        changeUser: (state, action) => {

            state.user = action.payload.user
        },
        addFriend: (state, action) => {
            if (state.user.friends[action.payload.id]) {
                delete state.user.friends[action.payload.id]
            } else {
                state.user.friends[action.payload.id] = true
            }
        },
        changePerson: (state, action) => {
            state.presentMessagePerson = action.payload
        },
        changeSetActiveUsers: (state, action) => {
            state.activeusers = action.payload
        },
        changeMessages: (state, action) => {
            //console.log(action.payload)
            state.messagesCount++;
        },
        changeMessagesManual: (state, action) => {
            state.messagesCount = action.payload
        },
        changeAlertMessages: (state, action) => {
            state.alertMessages = !state.alertMessages
        }

    }
})
export const { changeTheme, changeToken, changeUser, addFriend, changePerson, changeSetActiveUsers, changeLocal, changeMessages, changeAlertMessages, changeMessagesManual/* , changeConvoId  */ } = counterSlice.actions
export default counterSlice.reducer