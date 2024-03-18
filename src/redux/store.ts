import counterSlice from "@/redux/features/counterSlice";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;


const rootReducer = combineReducers({counter:counterSlice});

export const store = configureStore({
  reducer: rootReducer
});
