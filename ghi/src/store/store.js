import { configureStore } from '@reduxjs/toolkit';
import medicationQuantityReducer from '../slice/medicationQuantitySlice';
import { drugListApi } from './drugListApi';
import { authApi } from './authApi';
import { doctorsApi } from './doctorsApi';
import { profileApi } from './profileApi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
	reducer: {
		medicationQuantity: medicationQuantityReducer,
		[drugListApi.reducerPath]: drugListApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[doctorsApi.reducerPath]: doctorsApi.reducer,
		[profileApi.reducerPath]: profileApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(drugListApi.middleware)
			.concat(authApi.middleware)
			.concat(doctorsApi.middleware)
			.concat(profileApi.middleware),
});

setupListeners(store.dispatch);
