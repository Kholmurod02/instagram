import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ProfileApi = createApi({
	reducerPath: 'ProfileApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://instagram-api.softclub.tj',
		prepareHeaders: headers => {
			const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI5ZjU1YzRmOC1jNDUzLTQzNWQtYmM1My01YTc3ZWYwY2ZkY2QiLCJuYW1lIjoic3RyaW5nIiwiZW1haWwiOiJzdHJpbmciLCJzdWIiOiI1MTU1OTk1Yi1jMTNhLTQ4MWQtOGY3OS04NTAyNDEzOTEyYmEucG5nIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsImV4cCI6MTc0MzA1OTM5OCwiaXNzIjoiaW5zdGFncmFtLWdyb3VwIiwiYXVkIjoiaW5zdGFncmFtLWFwaSJ9.vfikxdg2y13W3LJ7gk1tE3zCZj4JxP3dYHcIPtBGJVU"
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
