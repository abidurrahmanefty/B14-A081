"use client";

import { authClient } from "@/lib/auth-client";
import { booksApi } from "@/lib/api";
import { BookForm, type BookFormValues } from "@/components/books/BookForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function AddBookPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  if (!session?.user) return null;

  async function handleSubmit(values: BookFormValues) {
    try {
      await booksApi.create(values);
      toast.success("Book added to the library!");
      router.push("/my-books");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add book");
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Add Book</h1>
      <p className="text-muted-foreground">Share a title with the BookNook community.</p>
      <BookForm
        userName={session.user.name || session.user.email}
        userEmail={session.user.email}
        submitLabel="Add Book"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
