import type { BookCategory } from "@/lib/constants";

export interface Book {
  _id: string;
  title: string;
  author: string;
  category: BookCategory;
  imageUrl: string;
  description: string;
  addedByName: string;
  addedByEmail: string;
  totalCopies: number;
  availableCopies: number;
  createdAt: string;
  updatedAt: string;
}

export interface Borrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
  status: "active" | "returned";
}
