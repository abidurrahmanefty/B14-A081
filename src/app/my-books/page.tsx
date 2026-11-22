import { headers } from "next/headers";
import type { Book } from "@/types/book";
import { booksApi } from "@/lib/api";
import { getAuth } from "@/lib/auth";
import { MyBooksClient } from "@/components/books/MyBooksClient";

export const metadata = { title: "My Books" };
export const dynamic = "force-dynamic";

export default async function MyBooksPage() {
  const auth = await getAuth();
  const session = await auth.api.getSession({ headers: await headers() });
  const email = session?.user?.email;

  if (!email) {
    return null;
  }

  let mine: Book[] = [];
  try {
    const all = await booksApi.list();
    mine = all.filter((b) => b.addedByEmail === email);
  } catch {
    mine = [];
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">My Books</h1>
      <p className="text-muted-foreground">Titles you have added to the library.</p>
      <MyBooksClient initial={mine} />
    </div>
  );
}
