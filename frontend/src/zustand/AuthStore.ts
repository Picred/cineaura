import { create } from "zustand";
import {
  LoginParams,
  loginUser,
  RegisterParams,
  registerUser,
} from "../api/user.api";

interface AuthStore {
  username: string | null;
  theme: string | null;
  login(params: LoginParams): Promise<void>;
  register(params: RegisterParams): Promise<void>;
  logout(): void;
}

export const authStore = create<AuthStore>((set) => ({
  username: null,
  theme: "dark",
  login: (params: LoginParams) =>
    loginUser(params)
      .then((_) => set({ username: params.username }))
      .catch((error) => {
        throw error;
      }),
  register: (params: RegisterParams) =>
    registerUser(params)
      .then(({ message }) => {
        set({ username: params.username });
        return message;
      })
      .catch((error) => {
        throw error;
      }),
  logout: () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    set({ username: null });
  },
}));
