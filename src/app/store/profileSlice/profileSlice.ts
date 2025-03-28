import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { jwtDecode } from 'jwt-decode'

export const ProfileApi = createApi({
	reducerPath: 'ProfileApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://instagram-api.softclub.tj',
		prepareHeaders: headers => {
			const access_token = localStorage.getItem('access_token')
			if (access_token) {
				headers.set('Authorization', `Bearer ${access_token}`)
				try {
					const tokenDecode = jwtDecode(access_token)
					console.log(tokenDecode)
					localStorage.setItem('decodeToken', JSON.stringify(tokenDecode))
				} catch (error) {
					console.error('Ошибка при декодировании токена:', error)
				}
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
		getFavoritePosts: build.query({
			query: () => '/UserProfile/get-post-favorites',
			providesTags: ['Profile'],
		}),
		getSibscribes: build.query({
			query: id => `/FollowingRelationShip/get-subscribers?UserId=${id}`,
			providesTags: ['Profile'],
		}),
		getSubscription: build.query({
			query: id => `/FollowingRelationShip/get-subscriptions?UserId=${id}`,
			providesTags: ['Profile'],
		}),
	}),
	keepUnusedDataFor: 30,
})

export const {
	useGetMyProfileQuery,
	useGetMyPostsQuery,
	useGetMyStoriesQuery,
	useGetFavoritePostsQuery,
	useGetSibscribesQuery,
	useGetSubscriptionQuery,
} = ProfileApi
