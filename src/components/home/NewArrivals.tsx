import Link from "next/link";
import type { Book } from "@/types/book";
import { booksApi } from "@/lib/api";
import { BookGrid } from "@/components/books/BookGrid";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export async function NewArrivals() {
  let books: Book[] = [];
  let error: string | null = null;

  try {
    books = await booksApi.list(6);
  } catch (e) {
    error = e instanceof Error ? e.message : "Could not load new arrivals";
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">New Arrivals</h2>
          <p className="text-sm text-muted-foreground">
            The six most recently added books in our community catalog.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/books">See All Books</Link>
        </Button>
      </div>

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : books.length === 0 ? (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      ) : (
        <BookGrid books={books} />
      )}
    </section>
  );
}
