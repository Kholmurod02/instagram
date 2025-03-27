import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://instagram-api.softclub.tj',
    prepareHeaders: (headers) => {
      // const token = localStorage.getItem('token'); 
      localStorage.getItem('token'); 
      // if (token) {
        headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI5ZjU1YzRmOC1jNDUzLTQzNWQtYmM1My01YTc3ZWYwY2ZkY2QiLCJuYW1lIjoic3RyaW5nIiwiZW1haWwiOiJzdHJpbmciLCJzdWIiOiI1MTU1OTk1Yi1jMTNhLTQ4MWQtOGY3OS04NTAyNDEzOTEyYmEucG5nIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsImV4cCI6MTc0MzE0NDkxNCwiaXNzIjoiaW5zdGFncmFtLWdyb3VwIiwiYXVkIjoiaW5zdGFncmFtLWFwaSJ9.J35LU8NQ5R4OnNCifVOZWxfqKL8CgQWppyBUfrYItwo`);
      // }
      return headers;
    },
  }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    addPost: builder.mutation({
      query: (formData) => ({
        url: '/Post/add-post',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Posts'],
    }),
    getPosts: builder.query({
      query: () => '/Post/get-posts',
      providesTags: ['Posts'],
    }),

  }),
});

export const { useAddPostMutation,useGetPostsQuery
} = postApi;