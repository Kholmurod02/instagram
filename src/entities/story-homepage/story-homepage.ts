import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const historyApi = createApi({
	reducerPath: 'historyApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://instagram-api.softclub.tj/Story/',
		prepareHeaders: (headers) => {
			const access_token = localStorage.getItem('access_token');
			
			if (access_token) {
				headers.set("Authorization", `Bearer ${access_token}`);
			 }
			
			return headers;
		 },
		}),
		endpoints: (builder) => ({
			getHistory: builder.query({
				query: () => 'get-stories',
			}),
		}),
})

export const { useGetHistoryQuery } = historyApi;