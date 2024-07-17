import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user.store.ts";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
