
import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth";

export const metadata = { title: "My Profile" };
export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const auth = await getAuth();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login?callbackUrl=/profile");
  }

  const user = session.user;

  const profileImage =
    "https://i.ibb.co.com/G4xN5X6K/Whats-App-Image-2026-06-26-at-09-41-17-1.jpg";

  return (
    <div className="surface-card mx-auto max-w-lg space-y-6 p-8">
      <h1 className="text-3xl font-bold text-foreground">
        My Profile
      </h1>

      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-full">
          <Image
            src={profileImage}
            alt={user.name || "Profile Picture"}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

        <div>
          <p className="text-lg font-semibold text-foreground">
            {user.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {user.email}
          </p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        Manage your books under My Books and track due dates from My Borrows.
      </p>
    </div>
  );
}

