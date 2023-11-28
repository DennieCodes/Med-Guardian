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
		}),
		providesTags: ['Profile'],
	}),
});

export const { useGetProfileQuery } = profileApi;
