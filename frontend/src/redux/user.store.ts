import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../types/user";
import {
  LoginParams,
  RegisterParams,
  loginUser,
  registerUser,
} from "../api/user.api";

export const userStore = createSlice({
  name: "user",
  initialState: {
    value: {} as UserType,
  },
  reducers: {
    loginStore(state, action) {
      state.value.username = action.payload.username;
      state.value.password = action.payload.password;
    },
    logoutStore(state) {
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

export const useRegisterAction = () => {
  return async (params: RegisterParams) => {
    await registerUser(params)
      .then((result) => console.log("Server Response: ", result))
      .catch((e) => {
        console.log("Error during registration: ", e.statusText);
      });
  };
};

export const { loginStore, logoutStore } = userStore.actions;
export const userReducer = userStore.reducer;
