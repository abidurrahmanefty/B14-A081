"use client";

import { useRouter } from "next/navigation";
import { BookCoverImage } from "@/components/books/BookCoverImage";
import { authClient } from "@/lib/auth-client";
import type { Book } from "@/types/book";
import { BorrowModal } from "@/components/borrows/BorrowModal";

export function BookDetailsClient({ book }: { book: Book }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const unavailable = book.availableCopies <= 0;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <BookCoverImage
        src={book.imageUrl}
        alt={book.title}
        className="mx-auto aspect-[4/5] w-full max-w-md rounded-2xl border border-border"
        sizes="(max-width:1024px) 100vw, 50vw"
        priority
      />
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">{book.category}</p>
        <h1 className="text-3xl font-bold text-foreground">{book.title}</h1>
        <p className="text-lg text-muted-foreground">by {book.author}</p>
        <p className="leading-relaxed text-foreground">{book.description}</p>
        <dl className="grid gap-2 text-sm">
          <div>
            <dt className="font-medium text-foreground">Added by</dt>
            <dd className="text-muted-foreground">
              {book.addedByName} ({book.addedByEmail})
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Copies available</dt>
            <dd className="text-muted-foreground">
              {book.availableCopies} of {book.totalCopies}
            </dd>
          </div>
        </dl>

        {user ? (
          <BorrowModal
            bookId={book._id}
            userName={user.name || user.email}
            userEmail={user.email}
            disabled={unavailable}
            disabledLabel="Not Available"
            onSuccess={() => router.refresh()}
          />
        ) : null}
      </div>
    </div>
  );
}
