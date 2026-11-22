import { fetchMyBorrowsServer } from "@/lib/server-api";
import { BorrowsTable } from "@/components/borrows/BorrowsTable";

export const metadata = { title: "My Borrows" };
export const dynamic = "force-dynamic";

export default async function MyBorrowsPage() {
  const borrows = await fetchMyBorrowsServer();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">My Borrows</h1>
      <p className="text-muted-foreground">Active loans and return dates.</p>
      <BorrowsTable initial={borrows} />
    </div>
  );
}
