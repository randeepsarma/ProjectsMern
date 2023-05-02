import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://127.0.0.1:5000/posts` }),

    endpoints: (builder) => ({
        // createPostRequest: builder.mutation({
        //     query: ({ post, token }) => {
        //         return {
        //             url: 'create',
        //             method: 'POST',
        //             body: post,
        //             headers: {
        //                 'authorization': `Bearer ${token}`,
        //             }
        //         }
        //     }
        // }),
        // getAllUserPosts: builder.query({
        //     query: () => {
        //         return {
        //             url: '',
        //             method: 'GET'
        //         }
        //     }
        // }),
        // deleteUserPosts: builder.mutation({
        //     query: () => {
        //         return {
        //             url: 'delete',
        //             method: 'DELETE'
        //         }
        //     }
        // })


    })
})


export const { useCreatePostRequestMutation, useGetAllUserPostsQuery } = postApi