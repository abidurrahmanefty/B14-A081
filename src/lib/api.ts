import type { Book, Borrow } from "@/types/book";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

let cachedToken: string | null = null;
let tokenExpiry = 0;

async function getApiToken(): Promise<string | null> {
  if (cachedToken && Date.now() < tokenExpiry - 30_000) {
    return cachedToken;
  }

  const res = await fetch("/api/token", { credentials: "include" });
  if (!res.ok) return null;

  const data = (await res.json()) as { token: string; expiresIn?: number };
  cachedToken = data.token;
  tokenExpiry = Date.now() + (data.expiresIn ?? 3600) * 1000;
  return cachedToken;
}

export function clearApiTokenCache() {
  cachedToken = null;
  tokenExpiry = 0;
}

type FetchOptions = RequestInit & { auth?: boolean };

async function apiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { auth = false, headers, ...rest } = options;
  const initHeaders = new Headers(headers);

  if (auth) {
    const token = await getApiToken();
    if (!token) {
      throw new Error("You must be logged in to perform this action.");
    }
    initHeaders.set("Authorization", `Bearer ${token}`);
  }

  if (rest.body && !initHeaders.has("Content-Type")) {
    initHeaders.set("Content-Type", "application/json");
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: initHeaders,
    cache: "no-store",
  });

  const text = await res.text();
  const data = text ? (JSON.parse(text) as { message?: string } & T) : ({} as T);

  if (!res.ok) {
    throw new Error(
      (data as { message?: string }).message || `Request failed (${res.status})`
    );
  }

  return data as T;
}

export const booksApi = {
  list: (latest?: number) =>
    apiFetch<Book[]>(latest ? `/books?latest=${latest}` : "/books"),
  get: (id: string) => apiFetch<Book>(`/books/${id}`),
  create: (body: Record<string, unknown>) =>
    apiFetch<Book>("/books", { method: "POST", body: JSON.stringify(body), auth: true }),
  update: (id: string, body: Record<string, unknown>) =>
    apiFetch<Book>(`/books/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      auth: true,
    }),
  remove: (id: string) =>
    apiFetch<{ message: string }>(`/books/${id}`, { method: "DELETE", auth: true }),
};

export const borrowsApi = {
  list: () => apiFetch<Borrow[]>("/borrows", { auth: true }),
  create: (bookId: string) =>
    apiFetch<Borrow>("/borrows", {
      method: "POST",
      body: JSON.stringify({ bookId }),
      auth: true,
    }),
  return: (id: string) =>
    apiFetch<{ message: string }>(`/borrows/${id}`, { method: "DELETE", auth: true }),
};
