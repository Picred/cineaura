import { createSlice } from "@reduxjs/toolkit";

export const userStore = createSlice({
  name: "user",
  initialState: {
    value: false,
  },
  reducers: {
    login(state) {
      state.value = true;
    },
    logout(state) {
      state.value = false;
    },
  },
});

export const { login, logout } = userStore.actions;
export const userReducer = userStore.reducer;
