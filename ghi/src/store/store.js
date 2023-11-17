import { configureStore } from '@reduxjs/toolkit';
import medicationQuantityReducer from '../slice/medicationQuantitySlice';

export const store = configureStore({
	reducer: {
		medicationQuantity: medicationQuantityReducer,
	},
});
