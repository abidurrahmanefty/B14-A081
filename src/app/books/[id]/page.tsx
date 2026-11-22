import { booksApi } from "@/lib/api";
import { BookDetailsClient } from "@/components/books/BookDetailsClient";
import { notFound } from "next/navigation";
import type { Book } from "@/types/book";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  try {
    const book = await booksApi.get(id);
    return { title: book.title };
  } catch {
    return { title: "Book Details" };
  }
}

export default async function BookDetailsPage({ params }: Props) {
  const { id } = await params;

  let book: Book | null = null;
  try {
    book = await booksApi.get(id);
  } catch {
    notFound();
  }

  if (!book) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <BookDetailsClient book={book} />
    </div>
  );
}
