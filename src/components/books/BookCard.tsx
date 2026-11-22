import Link from "next/link";
import type { Book } from "@/types/book";
import { BookCoverImage } from "@/components/books/BookCoverImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function BookCard({ book }: { book: Book }) {
  return (
    <Card className="h-full overflow-hidden">
      <BookCoverImage
        src={book.imageUrl}
        alt={book.title}
        className="aspect-[4/5] w-full"
        sizes="(max-width:768px) 100vw, 33vw"
      />
      <CardHeader className="flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-accent">{book.category}</p>
        <CardTitle className="line-clamp-2">{book.title}</CardTitle>
        <p className="text-sm text-muted-foreground">by {book.author}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <Button asChild className="w-full">
          <Link href={`/books/${book._id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
