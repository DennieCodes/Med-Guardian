import { configureStore } from "@reduxjs/toolkit";
import medicationQuantityReducer from "../slice/medicationQuantitySlice";
import { drugListApi } from "./drugListApi";
import { authApi } from "./authApi";
import { doctorsApi } from "./doctorsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { pharmaciesApi } from "./pharmacies";

export const store = configureStore({
  reducer: {
    medicationQuantity: medicationQuantityReducer,
    [drugListApi.reducerPath]: drugListApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [doctorsApi.reducerPath]: doctorsApi.reducer,
    [pharmaciesApi.reducerPath]: pharmaciesApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(drugListApi.middleware)
      .concat(authApi.middleware)
      .concat(doctorsApi.middleware)
      .concat(pharmaciesApi.middleware),
});

setupListeners(store.dispatch);
