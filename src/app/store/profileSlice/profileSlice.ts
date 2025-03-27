import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ProfileApi = createApi({
	reducerPath: 'ProfileApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://instagram-api.softclub.tj',
		prepareHeaders: headers => {
			const access_token = localStorage.getItem("access_token")
			if (access_token) {
				headers.set('Authorization', `Bearer ${access_token}`)
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
		getMyPosts: build.query({
			query: () => '/Post/get-my-posts',
			providesTags: ['Profile'],
		}),
		getMyStories: build.query({
			query: () => '/Story/get-my-stories',
			providesTags: ['Profile'],
		}),
	}),
})

export const { useGetMyProfileQuery } = ProfileApi
export const { useGetMyPostsQuery } = ProfileApi
export const { useGetMyStoriesQuery } = ProfileApi
