import type { Book } from "@/types/book";
import { booksApi } from "@/lib/api";
import { BookGrid } from "@/components/books/BookGrid";

export const metadata = { title: "All Books" };
export const dynamic = "force-dynamic";

export default async function AllBooksPage() {
  let books: Book[] = [];
  let error: string | null = null;

  try {
    books = await booksApi.list();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load books";
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground">All Books</h1>
        <p className="mt-2 text-muted-foreground">
          Every title in the community library, ready to explore.
        </p>
      </header>
      {error ? <p className="text-red-600">{error}</p> : <BookGrid books={books} />}
    </div>
  );
}
