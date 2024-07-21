import { create } from "zustand";
import {
  LoginParams,
  loginUser,
  RegisterParams,
  registerUser,
} from "../api/user.api";

interface AuthStore {
  username: string | null;
  login(params: LoginParams): Promise<void>;
  register(params: RegisterParams): Promise<void>;
  logout(): void;
}

export const authStore = create<AuthStore>((set) => ({
  username: null,
  login: (params: LoginParams) =>
    loginUser(params)
      .then((_) => set({ username: params.username }))
      .catch((error) => {
        console.error("Login failed:", error);
        throw error;
      }),
  register: (params: RegisterParams) =>
    registerUser(params)
      .then(({ message }) => {
        set({ username: params.username });
        return message;
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        throw error;
      }),

  logout: () => {
    set({ username: null });
  },
}));
