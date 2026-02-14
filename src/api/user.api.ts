import { MOCK_USERS } from "../utils/mockData";

export type LoginParams = {
  username: string;
  password: string;
};

export type RegisterParams = {
  username: string;
  password: string;
};

export const loginUser = async (params: LoginParams) => {
  const user = MOCK_USERS.find(u => u.username === params.username && u.password === params.password);
  if (user) {
    return { message: "User logged.", isAdmin: user.isAdmin, userId: user.id };
  }
  return Promise.reject("User not found. Please register.");
};

export const registerUser = async (_params: RegisterParams) => {
  return { message: "User registered." };
};
