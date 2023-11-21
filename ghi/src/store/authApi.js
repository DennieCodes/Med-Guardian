import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
	reducerPath: 'authentication',
	tagTypes: ['Token'],

	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_HOST,
	}),

	endpoints: (builder) => ({
		// Login
		login: builder.mutation({
			query: (info) => {
				let formData = null;
				if (info instanceof HTMLElement) {
					formData = new FormData(info);
				} else {
					formData = new FormData();
					formData.append('username', info.username);
					formData.append('password', info.password);
				}

				return {
					url: '/token',
					method: 'post',
					body: formData,
					credentials: 'include',
				};
			},
			providesTags: ['Account'],
			// invalidatesTags: (result) => {
			// 	return (result && ['Account']) || [];
			// },
		}),

		// Logout
		logout: builder.mutation({
			query: () => {
				return {
					url: '/token',
					method: 'delete',
					credentials: 'include',
				};
			},
			invalidatesTags: ['Account'],
		}),

		// Get Token
		getToken: builder.query({
			query: () => ({
				url: '/token',
				credentials: 'include',
			}),
			providesTags: ['Token'],
		}),
	}),
});

export const { useLoginMutation, useLogoutMutation, useGetTokenQuery } =
	authApi;
