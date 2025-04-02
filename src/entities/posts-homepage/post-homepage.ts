import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postsHomepageApi = createApi({
	reducerPath: 'postsHomepageApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://instagram-api.softclub.tj/Post/',
		prepareHeaders: (headers) => {
			const access_token = localStorage.getItem('access_token');
			if (access_token) {	
				headers.set('Authorization', `Bearer ${access_token}`)
			}
			return headers
		},
	}),
	endpoints: (builder) => ({
		getPostsHomepage: builder.query({
			query: () => 'get-posts',
		}),
	}),
})

export const { useGetPostsHomepageQuery } = postsHomepageApi;