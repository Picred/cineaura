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
      .then(() => {
        navigate("/");
        console.log("Login successful.");
        // Ora settare lo store con i dati,
      })
      .catch(() => {
        console.log("Invalid credentials."); // come gestisco questo? come mostro un errore al client?
      });
    // verify(params)
    //   .then((result) => console.log(result))
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };
};

export const useRegisterAction = () => {
  return (params: RegisterParams) => {
    registerUser(params)
      .then((result) => {
        return result;
      })
      // ora ho il token in result
      .catch((e) => {
        return "PROBLEMIIIIIIIIIIIIIIIIII: RICEVUTO ERRORE: -> ";
      });
  };
};

export const { loginStore, logoutStore } = userStore.actions;
export const userReducer = userStore.reducer;
