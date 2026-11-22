import Link from "next/link";
import { BookOpen } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-foreground">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
        <BookOpen className="h-5 w-5" />
      </span>
      <span className="text-xl font-bold tracking-tight">{SITE_NAME}</span>
    </Link>
  );
}
