"use client";

import { useState } from "react";
import { toast } from "sonner";
import { borrowsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type BorrowModalProps = {
  bookId: string;
  userName: string;
  userEmail: string;
  disabled?: boolean;
  disabledLabel?: string;
  onSuccess?: () => void;
};

export function BorrowModal({
  bookId,
  userName,
  userEmail,
  disabled,
  disabledLabel = "Not Available",
  onSuccess,
}: BorrowModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function confirmBorrow() {
    setLoading(true);
    try {
      await borrowsApi.create(bookId);
      toast.success("Book borrowed! Check My Borrows for return date.");
      setOpen(false);
      onSuccess?.();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not borrow book");
    } finally {
      setLoading(false);
    }
  }

  if (disabled) {
    return (
      <Button type="button" disabled className="w-full sm:w-auto">
        {disabledLabel}
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="w-full sm:w-auto">
          Borrow This Book
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm borrow</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 text-sm">
          <p className="text-muted-foreground">
            You are borrowing for 7 days. Return on time so others can enjoy the title.
          </p>
          <div>
            <p className="font-medium text-foreground">Name</p>
            <p className="text-muted-foreground">{userName}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Email</p>
            <p className="text-muted-foreground">{userEmail}</p>
          </div>
          <Button type="button" onClick={confirmBorrow} disabled={loading} className="w-full">
            {loading ? "Confirming…" : "Confirm Borrow"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
