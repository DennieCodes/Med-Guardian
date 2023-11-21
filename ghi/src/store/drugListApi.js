import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const drugListApi = createApi({
	reducerPath: 'drugList',

	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_HOST,
	}),

	endpoints: (builder) => ({
		getDrugList: builder.query({
			query: () => '/api/drug_list/', // Note: query can take in arguments such as id to customize the url endpoint, query: (id) => '/api/drug_list' + id
		}),
	}),
});

export const { useGetDrugListQuery } = drugListApi;
