import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const followingApi = createApi({
  reducerPath: 'followingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://instagram-api.softclub.tj',
    prepareHeaders: (headers) => {
      const access_token = localStorage.getItem('access_token');
      console.log("Текущий токен:", access_token);
      if (access_token) {
        headers.set('Authorization', `Bearer ${access_token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    addFollow: builder.mutation<void, { followerId: string; followingId: string }>({
      query: ({ followerId, followingId }) => ({
        url: '/FollowingRelationShip/add-following-relation-ship',
        method: 'POST',
        body: { followerId, followingId },
      }),
    }),
    removeFollow: builder.mutation<void, { followerId: string; followingId: string }>({
      query: ({ followerId, followingId }) => ({
        url: '/FollowingRelationShip/delete-following-relation-ship',
        method: 'DELETE',  
        body: { followerId, followingId },
      }),
    }),
  }),
});

export const { useAddFollowMutation, useRemoveFollowMutation } = followingApi;
