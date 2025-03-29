import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersHomepageApi = createApi({
	reducerPath: 'usersHomepageApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://instagram-api.softclub.tj/User/',
		prepareHeaders: (headers) => {
			const access_token = localStorage.getItem('access_token');
			if (access_token) {
				headers.set('Authorization', `Bearer ${access_token}`)
			}
			return headers
		},
	}),
	endpoints: (builder) => ({
		getUsersHomepage: builder.query({
			query: () => 'get-users',
		})
	})
})

export const { useGetUsersHomepageQuery } = usersHomepageApi;