import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    mode: "dark",
    token: null,
    user: null,
    presentMessagePerson: null,
    convoId: null,
    activeusers: null

}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
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
            state.presentMessagePerson = action.payload.person
        },
        changeConvoId: (state, action) => {
            state.convoId = action.payload.id
        },
        changeSetActiveUsers: (state, action) => {
            state.activeusers = action.payload
        }

    }
})
export const { changeTheme, changeToken, changeUser, addFriend, changePerson, changeConvoId, changeSetActiveUsers } = counterSlice.actions
export default counterSlice.reducer