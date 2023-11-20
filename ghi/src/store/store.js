import { configureStore } from '@reduxjs/toolkit';
import medicationQuantityReducer from '../slice/medicationQuantitySlice';
import { drugListApi } from './drugListApi';
import { authApi } from './authApi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
	reducer: {
		medicationQuantity: medicationQuantityReducer,
		[drugListApi.reducerPath]: drugListApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(drugListApi.middleware)
			.concat(authApi.middleware),
});

setupListeners(store.dispatch);
