import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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
    }),

    likeReel: builder.mutation({
      query: (reelId) => ({
        url: `Post/like-post?postId=${reelId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetReelsQuery, useLikeReelMutation, useFollowingMutation } = reelsApi;
