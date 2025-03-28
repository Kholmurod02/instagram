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
    likePost: builder.mutation({
      query: (postId) => ({
        url: `/Post/like-post?postId=${postId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Posts'],
    }),
    addComment: builder.mutation({
      query: ({ postId, comment }) => ({
        url: `/Post/add-comment`,
        method: 'POST',
        body: { postId, comment },
      }),
      invalidatesTags: (_result, _error, { postId }) => [{ type: 'Posts', id: postId }],
    }),
    

    savePost: builder.mutation({
      query: (postId) => ({
        url: `/Post/save-post?postId=${postId}`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Posts', id: 'Saved' }],
    }),
  }),
});

export const { useAddPostMutation,useGetPostsQuery,useLikePostMutation,  useSavePostMutation,  useAddCommentMutation
} = postApi;