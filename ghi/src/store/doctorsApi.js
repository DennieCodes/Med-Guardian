import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const doctorsApi = createApi({
    reducerPath: 'doctors',
    tagTypes: ['DoctorsPage'],
    baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_HOST,
	}),

    endpoints: builder=>({
        updateDoctor: builder.mutation({
             query: (data)=> ({
                url: `/api/doctors/${data.doctor_id}`,
                method: 'put',
                credentials: 'include', // send the cookies tomthe api
                body: data.doctor
            }),
            invalidatesTags: ["DoctorsPage"]
        }),
        createDoctor: builder.mutation({
            query: (data)=> ({
                url: '/api/doctors',
                method: 'post',
                credentials: 'include', // send the cookies tomthe api
                body: data
            }),
            invalidatesTags: ["DoctorsPage"]
        }),
        getDoctor: builder.query({
            query: (doctor_id) => ({
                url: `/api/doctors/${doctor_id}`,
                credentials: "include" // send the cookies tomthe api
            }),
            providesTags: ["DoctorsPage"]
        }),
        getDoctors: builder.query({
            query: () => ({
                url: "/api/doctors",
                credentials: "include" // send the cookies tomthe api
            }),
            providesTags: ["DoctorsPage"]
        }),
    })
});

export const {
    useGetDoctorsQuery,
    useGetDoctorQuery,
    useCreateDoctorMutation,
    useUpdateDoctorMutation,
} = doctorsApi
