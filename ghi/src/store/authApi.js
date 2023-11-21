import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
	reducerPath: 'authentication',
	tagTypes: ['Token', 'Account'],

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
				};
			},
			providesTags: ['Account'],
			// invalidatesTags: (result) => {
			// 	return (result && ['Account']) || [];
			// },
		}),

		// Register
		register: builder.mutation({
			query: (info) => {
				let formData = null;
				if (info instanceof HTMLElement) {
					formData = new FormData(info);
				} else {
					formData = new FormData();
					formData.append('first_name', info.firstName);
					formData.append('last_name', info.lastName);
					formData.append('username', info.username);
					formData.append('email', info.email);
					formData.append('phone', info.phone);
					formData.append('password', info.password);
				}

				return {
					url: '/api/accounts',
					method: 'post',
					body: formData,
				};
			},
			providesTags: ['Account'],
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

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useGetTokenQuery,
} = authApi;
