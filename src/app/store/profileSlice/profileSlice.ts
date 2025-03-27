import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ProfileApi = createApi({
	reducerPath: 'ProfileApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://instagram-api.softclub.tj',
		prepareHeaders: headers => {
			const token = localStorage.getItem('token')
			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
			}
			return headers
		},
	}),
	tagTypes: ['Profile'],
	endpoints: build => ({
		getMyProfile: build.query({
			query: () => '/UserProfile/get-my-profile',
			providesTags: ['Profile'],
		}),
		getMyPosts : build.query({
			query : () => "/Post/get-my-posts",
			providesTags: ['Profile'],
		})
	}),
})

export const { useGetMyProfileQuery } = ProfileApi 
export const { useGetMyPostsQuery } = ProfileApi 
