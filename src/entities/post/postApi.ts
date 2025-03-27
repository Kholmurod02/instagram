import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://instagram-api.softclub.tj',
    prepareHeaders: (headers) => {

      const access_token = localStorage.getItem('access_token'); 
      if (access_token) {
        headers.set('Authorization', `Bearer ${access_token}`);
      }

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