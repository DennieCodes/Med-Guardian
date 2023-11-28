import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const doctorsApi = createApi({
    reducerpath: 'doctors',
    baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_HOST,
	}),
    tagTypes: ["DoctorsPage"],
    endpoints: builder=>({
        updateDoctor: builder.mutation({
             query: (data)=> {
                return {
                url: '/api/doctors',
                method: 'put',
                credentials: 'include', // send the cookies tomthe api
                body: data
                }
            },
            invalidatesTags: ["DoctorsPage"]
        }),
        createDoctor: builder.mutation({
            query: (data)=> {
                return {
                url: '/api/doctors',
                method: 'post',
                credentials: 'include', // send the cookies tomthe api
                body: data
                }
            },
            invalidatesTags: ["DoctorsPage"]
        }),
        getDoctors: builder.query({
            query: ()=> ({
                url: '/api/doctors',
                credentials: 'include' // send the cookies tomthe api
            }),
            providesTags: ["DoctorsPage"]
        })

    })
});

export const {
    useGetDoctorsQuery,
    useCreateDoctorMutation,
} = doctorsApi
