import { create } from "zustand";
import {
  LoginParams,
  loginUser,
  RegisterParams,
  registerUser,
} from "../api/user.api";

interface AuthStore {
  username: string;
  isAdmin: boolean;
  theme: string;
  login(params: LoginParams): Promise<void>;
  register(params: RegisterParams): Promise<void>;
  logout(): void;
}

export const authStore = create<AuthStore>((set) => ({
  username: "",
  theme: "dark",
  isAdmin: false,
  login: (params: LoginParams) =>
    loginUser(params)
      .then((result) => {
        set({ username: params.username, isAdmin: Boolean(result.isAdmin) });
      })
      .catch((error) => {
        throw error;
      }),
  register: (params: RegisterParams) =>
    registerUser(params)
      .then(({ message }) => {
        return message;
      })
      .catch((error) => {
        throw error;
      }),
  logout: () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    set({ username: "", isAdmin: false });
  },
}));
