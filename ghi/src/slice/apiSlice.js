import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const gammaApi = createApi({
	reducerPath: 'gammaApi',

	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_HOST,
	}),

	endpoints: (builder) => ({
		getToken: builder.query({
			query: () => ({
				url: '/token',
				// credentials: include, is needed for any URL's the require authentication
				// This setting will send the token cookie to the urls.
				credentials: 'include',
			}),
			providesTags: ['Token'],
		}),
	}),
});

export const { useGetTokenQuery } = gammaApi;
