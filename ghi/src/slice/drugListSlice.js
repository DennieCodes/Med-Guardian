import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	drugList: [],
};

export const drugListSlice = createSlice({
	name: 'drugList',
	initialState,
});

export default drugListSlice.reducer;
