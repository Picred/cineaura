import { MOCK_USERS } from "../utils/mockData";

export type LoginParams = {
  username: string;
  password: string;
};

export type RegisterParams = {
  username: string;
  password: string;
};

const isDemo = import.meta.env.MODE === "demo";

export const loginUser = async (params: LoginParams) => {
  if (isDemo) {
    const user = MOCK_USERS.find(u => u.username === params.username && u.password === params.password);
    if (user) {
      return { message: "User logged.", isAdmin: user.isAdmin, userId: user.id };
    }
    return Promise.reject("User not found. Please register.");
  }

  return fetch("/api/user/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  })
    .then(async (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          return Promise.reject(error.msg || "Login error!");
        });
      }
      return response.json();
    })
    .then((data) => {
      return { message: data.msg, isAdmin: data.isAdmin, userId: data.userId };
    })
    .catch((error) => {
      console.error("Error during login:", error);
      return Promise.reject(error);
    });
};

export const registerUser = async (params: RegisterParams) => {
  if (isDemo) {
    return { message: "User registered." };
  }

  return fetch("/api/user/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          return Promise.reject(error.msg || "Errore durante la registrazione");
        });
      }
      return response.json();
    })
    .then((data) => {
      return { message: data.msg };
    })
    .catch((error) => {
      console.error("Error during registration:", error);
      return Promise.reject(error);
    });
};
