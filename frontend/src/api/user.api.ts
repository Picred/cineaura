export type LoginParams = {
  username: string;
  password: string;
};

export type RegisterParams = {
  username: string;
  password: string;
};

export const loginUser = async (params: LoginParams) => {
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
      return { message: data.msg, isAdmin: data.isAdmin };
    })
    .catch((error) => {
      console.error("Error during login:", error);
      return Promise.reject(error);
    });
};

export const registerUser = async (params: RegisterParams) => {
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
