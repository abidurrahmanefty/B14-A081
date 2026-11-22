import type { Book } from "@/types/book";
import { BookCard } from "./BookCard";

export function BookGrid({ books }: { books: Book[] }) {
  if (books.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
        No books in the catalog yet. Be the first to add one!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}
