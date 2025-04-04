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
		deleteImageProfile: build.mutation({
			query: () => ({
				url: '/UserProfile/delete-user-image-profile',
				method: 'DELETE',
				invalidatesTags: ['Profile'],
			}),
		}),
		editProfileImage: build.mutation({
			query: file => ({
				url: '/UserProfile/update-user-image-profile',
				method: 'PUT',
				body: file,
				invalidatesTags: ['Profile'],
			}),
		}),
		editProfile: build.mutation({
			query: updateUser => ({
				url: '/UserProfile/update-user-profile',
				method: 'PUT',
				body: updateUser,
				invalidatesTags: ['Profile'],
			}),
		}),
		getProfileById: build.query({
			query: id => `/UserProfile/get-user-profile-by-id?id=${id}`,
			providesTags: ['Profile'],
		}),
		getPostsById: build.query({
			query: id => `/Post/get-posts?UserId=${id}`,
			providesTags: ['Profile'],
		}),
		getStoryByid: build.query({
			query: id => `/Story/get-user-stories/${id}`,
			providesTags: ['Profile'],
		}),
		FollowByUserId: build.mutation({
			query: id => ({
				url: `/FollowingRelationShip/add-following-relation-ship?followingUserId=${id}`,
				method: 'POST',
				body: '', 
			}),
			invalidatesTags: ['Profile'],
		}),
		UnFollowByUserId : build.mutation({
			query : id => ({
				url : `/FollowingRelationShip/delete-following-relation-ship?followingUserId=${id}`,
				method : "DELETE",
				body : '',
			}),
			invalidatesTags: ['Profile'],
		})
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
	useDeleteImageProfileMutation,
	useEditProfileImageMutation,
	useEditProfileMutation,
	useGetProfileByIdQuery,
	useGetPostsByIdQuery,
	useGetStoryByidQuery,
	useFollowByUserIdMutation,
	useUnFollowByUserIdMutation,
} = ProfileApi
