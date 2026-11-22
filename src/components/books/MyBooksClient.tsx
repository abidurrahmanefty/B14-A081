"use client";

import Link from "next/link";
import { BookCoverImage } from "@/components/books/BookCoverImage";
import { useState } from "react";
import { toast } from "sonner";
import type { Book } from "@/types/book";
import { booksApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function MyBooksClient({ initial }: { initial: Book[] }) {
  const [books, setBooks] = useState(initial);

  async function handleDelete(id: string) {
    try {
      await booksApi.remove(id);
      setBooks((prev) => prev.filter((b) => b._id !== id));
      toast.success("Book removed from the catalog.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }

  if (books.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
        You have not added any books yet.{" "}
        <Link href="/add-book" className="font-semibold text-accent underline">
          Add your first book
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-card">
          <tr>
            <th className="px-4 py-3 font-semibold text-foreground">Cover</th>
            <th className="px-4 py-3 font-semibold text-foreground">Title</th>
            <th className="px-4 py-3 font-semibold text-foreground">Category</th>
            <th className="px-4 py-3 font-semibold text-foreground">Copies</th>
            <th className="px-4 py-3 font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id} className="border-t border-border">
              <td className="px-4 py-3">
                <BookCoverImage
                  src={book.imageUrl}
                  alt=""
                  className="h-16 w-12 rounded-md"
                  sizes="48px"
                />
              </td>
              <td className="px-4 py-3 font-medium text-foreground">{book.title}</td>
              <td className="px-4 py-3 text-muted-foreground">{book.category}</td>
              <td className="px-4 py-3 text-muted-foreground">
                {book.availableCopies}/{book.totalCopies}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/my-books/edit/${book._id}`}>Edit</Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button type="button" size="sm" variant="destructive">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogTitle>Delete this book?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This removes &quot;{book.title}&quot; from BookNook permanently.
                      </AlertDialogDescription>
                      <div className="mt-4 flex justify-end gap-2">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(book._id)}>
                          Delete
                        </AlertDialogAction>
                      </div>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
