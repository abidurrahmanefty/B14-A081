import { BOOK_CATEGORIES } from "@/lib/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  { title: "Browse", text: "Explore all books or filter by category to find your next read." },
  { title: "Borrow", text: "Sign in and reserve a copy — we hold it for you for seven days." },
  { title: "Return", text: "Finish early? Return from My Borrows and free a copy for someone else." },
];

export function ExtraSections() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <section className="surface-card p-8">
        <h2 className="text-2xl font-bold text-foreground">How Borrowing Works</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          BookNook keeps lending simple: one account, clear due dates, and friendly reminders built into your dashboard.
        </p>
        <ol className="mt-6 space-y-4">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="surface-card p-8">
        <h2 className="text-2xl font-bold text-foreground">Top Categories</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Jump into a genre — every category is curated by readers like you.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {BOOK_CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href="/books"
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-card"
            >
              {cat}
            </Link>
          ))}
        </div>
        <Button asChild className="mt-8">
          <Link href="/register">Create a free account</Link>
        </Button>
      </section>
    </div>
  );
}
