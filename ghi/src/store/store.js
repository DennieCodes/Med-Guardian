import { configureStore } from '@reduxjs/toolkit';
import medicationQuantityReducer from '../slice/medicationQuantitySlice';
import { drugListApi } from './drugListApi';
import { authApi } from './authApi';
import { doctorsApi } from './doctorsApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { pharmaciesApi } from './pharmacies';
import { medicationsApi } from './medications';
import { profileApi } from './profileApi';

export const store = configureStore({
	reducer: {
		medicationQuantity: medicationQuantityReducer,
		[drugListApi.reducerPath]: drugListApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[doctorsApi.reducerPath]: doctorsApi.reducer,
		[pharmaciesApi.reducerPath]: pharmaciesApi.reducer,
		[medicationsApi.reducerPath]: medicationsApi.reducer,
		[profileApi.reducerPath]: profileApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(drugListApi.middleware)
			.concat(authApi.middleware)
			.concat(doctorsApi.middleware)
			.concat(pharmaciesApi.middleware)
			.concat(medicationsApi.middleware)
			.concat(profileApi.middleware),
});

setupListeners(store.dispatch);
