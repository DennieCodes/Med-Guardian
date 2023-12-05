import { configureStore } from '@reduxjs/toolkit';
import medicationQuantityReducer from '../slice/medicationQuantitySlice';
import { authApi } from './authApi';
import { doctorsApi } from './doctorsApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { pharmaciesApi } from './pharmacies';
import { medicationsApi } from './medications';
import { profileApi } from './profileApi';
import { medScheduleApi } from './medScheduleApi';

export const store = configureStore({
	reducer: {
		medicationQuantity: medicationQuantityReducer,
		[authApi.reducerPath]: authApi.reducer,
		[doctorsApi.reducerPath]: doctorsApi.reducer,
		[pharmaciesApi.reducerPath]: pharmaciesApi.reducer,
		[medicationsApi.reducerPath]: medicationsApi.reducer,
		[profileApi.reducerPath]: profileApi.reducer,
		[medScheduleApi.reducerPath]: medScheduleApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(authApi.middleware)
			.concat(doctorsApi.middleware)
			.concat(pharmaciesApi.middleware)
			.concat(medicationsApi.middleware)
			.concat(profileApi.middleware)
			.concat(medScheduleApi.middleware),
});

setupListeners(store.dispatch);
