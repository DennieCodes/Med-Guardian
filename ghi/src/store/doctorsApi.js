import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const doctorsApi = createApi({
  reducerPath: "doctors",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST,
  }),
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: () => ({
        url: "/api/doctors",
        credentials: "include", // send the cookies tomthe api
      }),
    }),
  }),
});

export const { useGetDoctorsQuery } = doctorsApi;
