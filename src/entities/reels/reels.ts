import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIxM2NiMzllMi02YjcxLTQwMzItODhmYi1lMTM3N2E5YmJjNzAiLCJuYW1lIjoic3RyaW5nMTEyIiwiZW1haWwiOiJzdHJpbmcxMTIiLCJzdWIiOiIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiZXhwIjoxNzQzMDU0Nzc5LCJpc3MiOiJpbnN0YWdyYW0tZ3JvdXAiLCJhdWQiOiJpbnN0YWdyYW0tYXBpIn0.30oBQ9y-Db81o3Zcwg3YvvChkLPCa2qIwjL2LNlD7-Q";

export const reelsApi = createApi({
  reducerPath: 'reelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://instagram-api.softclub.tj/Post/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken');
		console.log(token);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
	getReels: builder.query({
	  query: () => 'get-reels',
	}),
	likeReel: builder.mutation({
	  query: (reelId) => ({
      url: `like-post?postId=${reelId}`,
      method: 'POST',
    }),
	}),
 }),
})

export const { useGetReelsQuery,useLikeReelMutation } = reelsApi