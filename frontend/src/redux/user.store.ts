import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../types/user";

export const userStore = createSlice({
  name: "user",
  initialState: {
    value: {} as UserType,
  },
  reducers: {
    login(state, action) {
      state.value.username = action.payload.username;
      state.value.password = action.payload.password;
    },
    logout(state) {
      state.value = {} as UserType;
    },
  },
});

export const { login, logout } = userStore.actions;
export const userReducer = userStore.reducer;
