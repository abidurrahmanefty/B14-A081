import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import type { Borrow } from "@/types/book";
import { getAuth } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function getTokenForRequest(): Promise<string | null> {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;

  const auth = await getAuth();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return null;

  return jwt.sign(
    {
      userId: session.user.id,
      email: session.user.email,
      name: session.user.name || session.user.email,
    },
    secret,
    { expiresIn: 3600 }
  );
}

export async function fetchMyBorrowsServer(): Promise<Borrow[]> {
  const token = await getTokenForRequest();
  if (!token) return [];

  const res = await fetch(`${API_URL}/borrows`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json() as Promise<Borrow[]>;
}
