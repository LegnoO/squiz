import userSlice from "@/redux/features/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({ user: userSlice });

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
