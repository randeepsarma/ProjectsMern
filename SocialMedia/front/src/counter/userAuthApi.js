import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from 'redux-persist'

export const userAuthApi = createApi({
    reducerPath: 'userAuthApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://127.0.0.1:5000/user/`,
    }),
    /* extractRehydrationInfo(action, { reducerPath }) {
       if (action.type === REHYDRATE) {
         return action.payload[reducerPath]
       }
     },  */

    endpoints: (build) => ({
        // registerUser: build.mutation({
        //     query: (user) => {
        //         return {
        //             url: 'register',
        //             method: 'POST',
        //             body: user,

        //         }
        //     }
        // }),
        // loginUser: build.mutation({
        //     query: (user) => {
        //         return {
        //             url: 'login',
        //             method: 'POST',
        //             body: user,

        //         }
        //     }
        // }),
        //display data about the posts

    })
})


export const { useRegisterUserMutation, useLoginUserMutation, useGetUserdataQuery } = userAuthApi