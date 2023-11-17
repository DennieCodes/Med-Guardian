import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const drugListApi = createApi({
	reducerPath: 'drugList',

	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:8000', // baseQuery should be from env and not hardcoded below, ie. process.env.REACT_APP_DJANGO_API
	}),

	endpoints: (builder) => ({
		getDrugList: builder.query({
			query: () => '/api/drug_list', // Note: query can take in arguments such as id to customize the url endpoint, query: (id) => '/api/drug_list' + id
		}),
	}),
});

// http://localhost:8000/api/drug_list
export const { useGetDrugListQuery } = drugListApi;
