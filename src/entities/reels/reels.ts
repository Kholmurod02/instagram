import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { METHODS } from 'http'
import { url } from 'inspector'

export const reelsApi = createApi({
  reducerPath: "reelsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://instagram-api.softclub.tj/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      console.log("🔑Токен:", token);
      if (token) {  
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getReels: builder.query({
      query: () => "Post/get-reels?PageSize=10000",
    }),

    following: builder.mutation({
      query: (userId) => ({
        url: `FollowingRelationShip/add-following-relation-ship?followingUserId=${userId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Posts"],
    }),
    commentPost: builder.mutation({
      query: ({ postId, comment }) => ({
        url: "/Post/add-comment",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({comment,postId})
      }),
    }),
    view:builder.mutation({
      query: (viewId) => ({
        url: `Post/like-post?postId=${viewId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Posts"],
    }),
    likeReel: builder.mutation({
      query: (reelId) => ({
        url: `Post/like-post?postId=${reelId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Posts"],
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `Post/delete-comment?commentId=${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"], 
    }),

    favoRite: builder.mutation({
      query: (saveId) => ({
        url: "Post/add-post-favorite",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { postId: saveId }
      }),
      invalidatesTags: ["Posts"]
    })
    
  }),
});

export const { useGetReelsQuery, useLikeReelMutation, useFollowingMutation, useCommentPostMutation, useViewMutation, useDeleteCommentMutation, useFavoRiteMutation } = reelsApi;
