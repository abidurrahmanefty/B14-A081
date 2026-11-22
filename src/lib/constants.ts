export const SITE_NAME = "BookNook";

/** Fallback when cover URL is missing or fails to load */
export const STATIC_BOOK_COVER = "/images/book-placeholder.svg";

export const BOOK_CATEGORIES = [
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Others",
] as const;

export type BookCategory = (typeof BOOK_CATEGORIES)[number];

export const BORROW_DURATION_DAYS = 7;

export const PRIVATE_ROUTES = [
  "/add-book",
  "/my-books",
  "/my-borrows",
  "/profile",
  "/books/", // prefix for book details
] as const;
