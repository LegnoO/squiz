import type { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  userInfo: {
    name: { first_name: string; last_name: string };
    birthday: Date;
    phone_number: string;
    email: string;
    username: string;
    password: string;
    avatar: string;
    role: "teacher" | "student";
    courses: string[];
  };
}


const initialState: IUser = {
  userInfo: {
    name: { first_name: "", last_name: "" },
    birthday: new Date(),
    phone_number: "",
    email: "",
    username: "",
    password: "",
    avatar: "",
    role: "teacher",
    courses: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateInfoUser: (state, action: PayloadAction<IUser>) => {
      state.userInfo = action.payload.userInfo;
    },
  },
});

export const { updateInfoUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selecUser = (state: RootState) => state.user;

export default userSlice.reducer;
