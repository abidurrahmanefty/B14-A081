"use client";

import { useState } from "react";
import { BookCoverImage } from "@/components/books/BookCoverImage";
import { toast } from "sonner";
import type { Borrow } from "@/types/book";
import { borrowsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";

type BorrowsTableProps = {
  initial: Borrow[];
};

export function BorrowsTable({ initial }: BorrowsTableProps) {
  const [rows, setRows] = useState(initial);

  async function handleReturn(id: string) {
    try {
      await borrowsApi.return(id);
      setRows((prev) => prev.filter((b) => b._id !== id));
      toast.success("Book returned. Thank you for reading!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Return failed");
    }
  }

  if (rows.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
        You have no active borrows. Explore All Books to start reading.
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
            <th className="px-4 py-3 font-semibold text-foreground">Borrow Date</th>
            <th className="px-4 py-3 font-semibold text-foreground">Return Date</th>
            <th className="px-4 py-3 font-semibold text-foreground">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((b) => (
            <tr key={b._id} className="border-t border-border">
              <td className="px-4 py-3">
                <BookCoverImage
                  src={b.bookImage}
                  alt={b.bookTitle}
                  className="h-16 w-12 rounded-md"
                  sizes="48px"
                />
              </td>
              <td className="px-4 py-3 font-medium text-foreground">{b.bookTitle}</td>
              <td className="px-4 py-3 text-muted-foreground">{formatDate(b.borrowDate)}</td>
              <td className="px-4 py-3 text-muted-foreground">{formatDate(b.returnDate)}</td>
              <td className="px-4 py-3">
                <Button type="button" size="sm" variant="outline" onClick={() => handleReturn(b._id)}>
                  Return Book
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
