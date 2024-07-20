import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../types/user";
import {
  LoginParams,
  RegisterParams,
  loginUser,
  registerUser,
  verify,
} from "../api/user.api";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return async (params: LoginParams) => {
    await loginUser(params)
      .then(() => navigate("/"))
      .catch((e) => {
        console.log("Invalid credentials: ", e);
      });
    // verify(params)
    //   .then((result) => console.log(result))
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };
};

export const useRegisterAction = () => {
  return async (params: RegisterParams) => {
    await registerUser(params)
      .then((result) => console.log("Server Response: ", result))
      // ora ho il token in result
      .catch((e) => {
        console.log("Username already exists or password doesn't match", e);
      });
  };
};

export const { loginStore, logoutStore } = userStore.actions;
export const userReducer = userStore.reducer;
