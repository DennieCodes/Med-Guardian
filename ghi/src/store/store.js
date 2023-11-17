import { configureStore } from '@reduxjs/toolkit';
import medicationQuantityReducer from '../slice/medicationQuantitySlice';
import { drugListApi } from './drugListApi';
import { setupListeners } from '@reduxjs/toolkit/query';
// import drugListSliceReducer from '../slice/drugListSlice';

export const store = configureStore({
	reducer: {
		medicationQuantity: medicationQuantityReducer,
		[drugListApi.reducerPath]: drugListApi.reducer,

		// drugList: drugListSliceReducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(drugListApi.middleware),
});

setupListeners(store.dispatch);
