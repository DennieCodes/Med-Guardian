import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const medScheduleApi = createApi({
	reducerPath: 'medSchedule',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_HOST,
	}),
	tagTypes: ['MedSchedule'],
	endpoints: (builder) => ({
		getEvents: builder.query({
			query: () => ({
				url: '/api/events',
				credentials: 'include',
			}),
			providesTags: ['MedSchedule'],
		}),

		addEvent: builder.mutation({
			query: (data) => ({
				url: '/api/events',
				body: data,
				method: 'post',
				credentials: 'include',
			}),
			invalidatesTags: ['MedSchedule'],
		}),

		updateEventColor: builder.mutation({
			query: (data) => ({
				url: `/api/events/${data.event_id}/${data.color}`,
				method: 'put',
				credentials: 'include',
			}),
			invalidatesTags: ['MedSchedule'],
		}),
	}),
});

export const {
	useGetEventsQuery,
	useAddEventMutation,
	useUpdateEventColorMutation,
} = medScheduleApi;
