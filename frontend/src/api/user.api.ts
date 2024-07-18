export type LoginParams = {
  username: string;
  password: string;
};

export const loginUser = (params: LoginParams) => {
  return fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  }).then((result) =>
    result.ok ? (result.json() as Promise<string>) : Promise.reject(result)
  );
};
