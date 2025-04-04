import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const searchApi = createApi({
	reducerPath: 'searchApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://instagram-api.softclub.tj',
		prepareHeaders: (headers) => {
			const access_token = localStorage.getItem('access_token');
			
			if (access_token) {
				headers.set("Authorization", `Bearer ${access_token}`);
			 }
			
			return headers;
		 },
		}),
		tagTypes: ['Search'],
		endpoints: (builder) => ({
			 searchUsers: builder.query({
				query: (value) => `/User/get-users?UserName=${value}`,
				providesTags: ['Search'],
			 }),
			 searchUsersAfterClick: builder.query({
				query: () => `/User/get-user-search-histories`,
				providesTags: ['Search'],
			 }),
			 deleteUser: builder.mutation({
				query: (deleteId) => ({
					url: `/User/delete-user-search-history?id=${deleteId}`,
					method: 'DELETE',
				 }),
				 invalidatesTags: ['Search'],
			 }),
			 deleteAllUser: builder.mutation({
				query: () => ({
					url: `/User/delete-user-search-histories`,
					method: 'DELETE',
				 }),
				 invalidatesTags: ['Search'],
			 }),
			 postUser: builder.mutation({
				query: (postId) => ({
					url: `/User/add-user-search-history?UserSearchId=${postId}`,
					method: 'POST',
				 }),
				 invalidatesTags: ['Search'],
			 }),
		}),
})

export const {useSearchUsersQuery, useDeleteUserMutation,useSearchUsersAfterClickQuery, usePostUserMutation, useDeleteAllUserMutation} = searchApi;
