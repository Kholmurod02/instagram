import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiJkMmEyYzlhYi1lMmM0LTQwNmUtOWVmOS03NGNhZjRlZmFkY2YiLCJuYW1lIjoibWFrczAwNSIsImVtYWlsIjoibWFrc0BnbWFpbC5jb20iLCJzdWIiOiIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiZXhwIjoxNzQzMDUzMjgwLCJpc3MiOiJpbnN0YWdyYW0tZ3JvdXAiLCJhdWQiOiJpbnN0YWdyYW0tYXBpIn0.gLrOySeblVgxCkRF5tv5ITW9mIPTGWNbnNkoGfKHAEI"

export const historyApi = createApi({
	reducerPath: 'historyApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://instagram-api.softclub.tj/Story/',
		prepareHeaders: (headers) => {
			const token = localStorage.getItem('token');
			console.log(token);
			
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
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