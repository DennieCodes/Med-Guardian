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
					credentials: 'include',
				};
			},
			providesTags: ['Account'],
			invalidatesTags: ['Token'],
		}),

		// Register
		register: builder.mutation({
			query: (info) => {
				const registerObj = {
					first_name: info.firstName,
					last_name: info.lastName,
					username: info.username,
					email: info.email,
					phone: info.phone,
					password: info.password,
				};

				return {
					url: '/api/accounts',
					method: 'post',
					body: registerObj,
				};
			},
			providesTags: ['Account'],
			invalidatesTags: ['Token'],
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
			invalidatesTags: ['Account', 'Token'],
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
