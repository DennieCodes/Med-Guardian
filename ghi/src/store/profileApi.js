import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const profileApi = createApi({
	reducerPath: 'profile',
	tagTypes: ['Profile'],

	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_HOST,
	}),

	endpoints: (builder) => ({
		// Get Profile
		getProfile: builder.query({
			query: () => ({
				url: '/api/profiles/',
				credentials: 'include',
			}),
			providesTags: ['Profile'],
		}),

		addProfile: builder.mutation({
			query: (data) => ({
				url: '/api/profiles',
				method: 'post',
				body: data,
				credentials: 'include',
			}),
			invalidatesTags: ['Profile'],
		}),

		updateProfile: builder.mutation({
			query: (data) => ({
				url: `/api/profiles/${data.profile_id}`,
				body: data,
				method: 'put',
				credentials: 'include',
			}),
			invalidatesTags: ['Profile'],
		}),
	}),
});

export const {
	useGetProfileQuery,
	useAddProfileMutation,
	useUpdateProfileMutation,
} = profileApi;
