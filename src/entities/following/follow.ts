import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const followingApi = createApi({
  reducerPath: 'followingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://instagram-api.softclub.tj',
    prepareHeaders: (headers) => {
      const access_token = localStorage.getItem('access_token');
      console.log("Текущий токен:", access_token); // Логирование для дебага
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
        method: 'POST',  // Для добавления подписки используем POST
        body: { followerId, followingId },
      }),
    }),
    removeFollow: builder.mutation<void, { followerId: string; followingId: string }>({
      query: ({ followerId, followingId }) => ({
        url: '/FollowingRelationShip/delete-following-relation-ship',  // URL для удаления
        method: 'DELETE',  // Используем метод DELETE для удаления подписки
        body: { followerId, followingId }, // Тело запроса содержит данные для удаления
      }),
    }),
  }),
});

export const { useAddFollowMutation, useRemoveFollowMutation } = followingApi;
