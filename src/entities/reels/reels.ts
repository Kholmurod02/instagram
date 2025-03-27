import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const reelsApi = createApi({
	reducerPath: 'reelsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://instagram-api.softclub.tj/Post/',
		prepareHeaders: headers => {
			const token = localStorage.getItem('token')
			console.log(token)  
			headers.set('Authorization', `Bearer ${token}`)

			return headers
		},
	}),
	endpoints: builder => ({
		getReels: builder.query({
			query: () => 'get-reels',
		}),
		likeReel: builder.mutation({
			query: reelId => ({
				url: `like-post?postId=${reelId}`,
				method: 'POST',
			}),
		}),
	}),
})

export const { useGetReelsQuery, useLikeReelMutation } = reelsApi
