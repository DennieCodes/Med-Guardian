import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pharmaciesApi = createApi({
  reducerpath: "pharmacies",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST,
  }),
  tagTypes: ["PharmacyList"],
  endpoints: (builder) => ({
    getPharmacies: builder.query({
      query: () => ({
        url: "/api/pharmacies",
        credentials: "include",
      }),
      providesTags: ["PharmacyList"],
    }),
    addPharmacy: builder.mutation({
      query: (data) => ({
        url: "/api/pharmacies",
        body: data,
        method: "post",
        credentials: "include",
      }),
      invalidatesTags: ["PharmacyList"],
    }),
  }),
});

export const { useGetPharmaciesQuery, useAddPharmacyMutation } = pharmaciesApi;
