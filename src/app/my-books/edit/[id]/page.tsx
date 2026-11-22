"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { booksApi } from "@/lib/api";
import type { Book } from "@/types/book";
import { BookForm, type BookFormValues } from "@/components/books/BookForm";
import { Spinner } from "@/components/ui/spinner";

export default function EditBookPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    booksApi
      .get(id)
      .then(setBook)
      .catch(() => toast.error("Could not load book"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  if (!book || !session?.user) {
    return <p className="text-red-600">Book not found or access denied.</p>;
  }

  if (book.addedByEmail !== session.user.email) {
    return <p className="text-red-600">You can only edit your own books.</p>;
  }

  async function handleSubmit(values: BookFormValues) {
    try {
      await booksApi.update(id, values);
      toast.success("Book updated successfully.");
      router.push("/my-books");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Edit Book</h1>
      <BookForm
        initial={{
          title: book.title,
          author: book.author,
          category: book.category,
          imageUrl: book.imageUrl,
          description: book.description,
          totalCopies: book.totalCopies,
        }}
        userName={session.user.name || session.user.email}
        userEmail={session.user.email}
        submitLabel="Save Changes"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
