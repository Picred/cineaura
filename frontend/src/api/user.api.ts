export type LoginParams = {
  username: string;
  password: string;
};

export function loginUser(params: LoginParams): Promise<string> {
  return fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  }).then((result) =>
    result.ok ? (result.json() as Promise<string>) : Promise.reject(result)
  );
}
