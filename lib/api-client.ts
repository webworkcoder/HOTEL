/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(BASE_URL + url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "API Error");
  }

  return res.json();
}

export const apiClient = {
  get: <T>(url: string) => request<T>(url),

  post: <T>(url: string, body: any) =>
    request<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  patch: <T>(url: string, body: any) =>
    request<T>(url, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: <T>(url: string) =>
    request<T>(url, {
      method: "DELETE",
    }),
};
