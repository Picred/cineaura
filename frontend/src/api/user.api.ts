export type LoginParams = {
  username: string;
  password: string;
};

export type RegisterParams = {
  username: string;
  password: string;
};
export const loginUser = (params: LoginParams) => {
  return fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          return Promise.reject(error.msg || "Errore durante il login");
        });
      }
      return response.json();
    })
    .then((data) => {
      return { message: data.msg };
    })
    .catch((error) => {
      console.error("Error during login:", error);
      return Promise.reject(error);
    });
};

export const registerUser = (params: RegisterParams) => {
  return fetch("/api/auth/register", {
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

// export const verify = (params: LoginParams) => {
//   return fetch("/api/auth/verify", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(params),
//   }).then((result) =>
//     result.ok ? (result.json() as Promise<string>) : Promise.reject(result)
//   );
// };
