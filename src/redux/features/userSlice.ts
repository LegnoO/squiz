"use client";
import type { RootState } from "@/redux/store";
import { IUser } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = { userInfo: Partial<IUser | null> };
const initialState: UserState = {
  userInfo:
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("userData")!)) ||
    null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateInfoUser: (state, action: PayloadAction<IUser>) => {
      state.userInfo = action.payload;
    },
    clearUserData: (state) => {
      state.userInfo = null;
      localStorage.removeItem("jwt");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("userData");
    },
  },
});

export const { clearUserData, updateInfoUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selecUser = (state: RootState) => state.user;

export default userSlice.reducer;
