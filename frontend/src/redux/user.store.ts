import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../types/user";
import { LoginParams, loginUser } from "../api/user.api";

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

export const useLoginAction = () => {
  return async (params: LoginParams) => {
    await loginUser(params)
      .then((result) => console.log("Server Response: ", result))
      .catch((e) => {
        console.log("Error during login: ", e.statusText);
      });
  };
};

export const { login, logout } = userStore.actions;
export const userReducer = userStore.reducer;
