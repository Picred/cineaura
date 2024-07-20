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
  }).then((result) =>
    result.ok ? (result.json() as Promise<string>) : Promise.reject(result)
  );
};

export const registerUser = (params: RegisterParams) => {
  return fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  }).then((result) =>
    result.ok ? (result.json() as Promise<string>) : Promise.reject(result)
  );
};

export const verify = (params: LoginParams) => {
  return fetch("/api/auth/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  }).then((result) =>
    result.ok ? (result.json() as Promise<string>) : Promise.reject(result)
  );
};
