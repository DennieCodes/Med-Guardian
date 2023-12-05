import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const medicationsApi = createApi({
	reducerPath: 'medications',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_HOST,
	}),
	tagTypes: ['MedicationsList'],
	endpoints: (builder) => ({
		getMedications: builder.query({
			query: () => ({
				url: '/api/medications',
				credentials: 'include',
			}),
			providesTags: ['MedicationsList'],
		}),
		addMedication: builder.mutation({
			query: (data) => ({
				url: '/api/medications',
				body: data,
				method: 'post',
				credentials: 'include',
			}),
			invalidatesTags: ['MedicationsList'],
		}),
		getMedication: builder.query({
			query: (medication_id) => ({
				url: `/api/medications/${medication_id}`,
				credentials: 'include',
			}),
		}),
		updateMedication: builder.mutation({
			query: (data) => ({
				url: `/api/medications/${data.medication_id}`,
				body: data.medication,
				method: 'put',
				credentials: 'include',
			}),
			invalidatesTags: ['MedicationsList'],
		}),
		deleteMedication: builder.mutation({
			query: (medication_id) => ({
				url: `/api/medications/${medication_id}`,
				method: 'delete',
				credentials: 'include',
			}),
			invalidatesTags: ['MedicationsList'],
		}),
		getDrugList: builder.query({
			query: () => '/api/drug_list/',
		}),
		getDrugInteractions: builder.query({
			query: () => ({
				url: '/api/users_drug_interactions',
				credentials: 'include',
			}),
			providesTags: ['MedicationsList'],
		}),
		updateMedicationQuantity: builder.mutation({
			query: (data) => ({
				url: `/api/medications/${data.medication_id}/quantity`,
				body: data.medication,
				method: 'put',
				credentials: 'include',
			}),
			invalidatesTags: ['MedicationsList'],
		}),
		updateRefillQuantity: builder.mutation({
			query: (data) => ({
				url: `/api/medications/${data.medication_id}/refill`,
				method: 'put',
				credentials: 'include',
			}),
			invalidatesTags: ['MedicationsList'],
		}),
	}),
});

export const {
	useGetMedicationsQuery,
	useAddMedicationMutation,
	useGetMedicationQuery,
	useUpdateMedicationMutation,
	useDeleteMedicationMutation,
	useGetDrugListQuery,
	useGetDrugInteractionsQuery,
	useUpdateMedicationQuantityMutation,
	useUpdateRefillQuantityMutation,
} = medicationsApi;
