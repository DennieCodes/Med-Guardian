import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const doctorsApi = createApi({
    reducerpath: 'doctors',
    baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_HOST,
	}),
    endpoints: builder=>({
        getDoctors: builder.query({
            query: ()=> '/api/doctors/'
        })
    })
});

export const { useGetDoctorsQuery } = doctorsApi
