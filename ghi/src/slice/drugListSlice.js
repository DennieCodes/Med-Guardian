import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	drugList: [],
};

export const drugListSlice = createSlice({
	name: 'drugList',
	initialState,
	reducers: {
		// 	increment: (state) => {
		// 		state.value += 1;
		// 	},
		// 	decrement: (state) => {
		// 		state.value -= 1;
		// 	},
		// 	incrementByAmount: (state, action) => {
		// 		state.value += action.payload;
		// 	},
	},
});

export const { increment, decrement, incrementByAmount } =
	drugListSlice.actions;

export default drugListSlice.reducer;
