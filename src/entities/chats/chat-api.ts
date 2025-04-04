import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
    reducerPath: "chatsCache", // Лучше исправить "chatsCash" на "chatsCache"
    baseQuery: fetchBaseQuery({
        baseUrl: "https://instagram-api.softclub.tj",
        prepareHeaders: (headers) => {
            const access_token = localStorage.getItem("access_token");

            if (access_token) {
                headers.set("Authorization", `Bearer ${access_token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Chats"], // Исправил на Chats (с большой буквы, это стандарт Redux)
    endpoints: (builder) => ({
        getChats: builder.query({
            query: () => "/Chat/get-chats",
            providesTags: ["Chats"], // Чаты кешируются
        }),
        getChatById: builder.query({
            query: (id) => `/Chat/get-chat-by-id?chatId=${id}`,
            providesTags: (result, error, id) => [{ type: "Chats", id }], // Кеширование по ID
        }),
        sendMessage: builder.mutation({
            query: (formData) => ({
                url: "/Chat/send-message",
                method: 'PUT',
                body: formData
            }),
            invalidatesTags: ['Chats'],
        }),
        deleteMessage: builder.mutation({
            query: (id) => ({
                url: `/Chat/delete-message?massageId=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Chats'],
        }),
        createChat : builder.mutation({
            query : (userId)=>({
                url:`/Chat/create-chat?receiverUserId=${userId}`,
                method:"POST"
            }),
            invalidatesTags: ['Chats'],
        }),
        deleteChat: builder.mutation({
            query: (id) => ({
                url: `/Chat/delete-chat?chatId=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Chats'],
        }),
    })
});

export const { useGetChatsQuery, useGetChatByIdQuery, useSendMessageMutation, useDeleteMessageMutation , useCreateChatMutation , useDeleteChatMutation} = chatApi;
