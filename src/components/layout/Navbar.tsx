"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { clearApiTokenCache } from "@/lib/api";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
];

const privateLinks = [
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);

  const isLoggedIn = Boolean(session?.user);

  async function handleLogout() {
    await authClient.signOut();
    clearApiTokenCache();
    router.push("/");
    router.refresh();
  }

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const navLink = (href: string, label: string) => (
    <Link
      key={href}
      href={href}
      onClick={() => setOpen(false)}
      className={cn(
        "text-sm font-medium transition-colors",
        isActive(href)
          ? "border-b-2 border-accent text-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-header/95 backdrop-blur">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />

        <nav className="hidden items-center gap-6 md:flex">
          {publicLinks.map((l) => navLink(l.href, l.label))}
          {isLoggedIn && privateLinks.map((l) => navLink(l.href, l.label))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {!isPending && !isLoggedIn && (
            <>
              <Button asChild variant="outline" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
          {isLoggedIn && session?.user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="rounded-full outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-accent/50"
                >
                  <Avatar>
                    <AvatarImage src={session.user.image || undefined} alt={session.user.name} />
                    <AvatarFallback>
                      {(session.user.name || session.user.email || "?").charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{session.user.name || session.user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>My Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <button
          type="button"
          className="text-foreground md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border px-4 py-4 md:hidden">
          <RemoteMobileMenu
            isLoggedIn={isLoggedIn}
            onClose={() => setOpen(false)}
            onLogout={handleLogout}
            isActive={isActive}
          />
        </div>
      )}
    </header>
  );
}

function RemoteMobileMenu({
  isLoggedIn,
  onClose,
  onLogout,
  isActive,
}: {
  isLoggedIn: boolean;
  onClose: () => void;
  onLogout: () => void;
  isActive: (href: string) => boolean;
}) {
  const links = [...publicLinks, ...(isLoggedIn ? privateLinks : [])];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <ThemeToggle />
        {!isLoggedIn && (
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/login" onClick={onClose}>
                Login
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/register" onClick={onClose}>
                Register
              </Link>
            </Button>
          </div>
        )}
      </div>
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          onClick={onClose}
          className={cn(
            "text-sm font-medium",
            isActive(l.href) ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {l.label}
        </Link>
      ))}
      {isLoggedIn && (
        <>
          <Link href="/profile" onClick={onClose} className="text-sm font-medium text-foreground">
            My Profile
          </Link>
          <button type="button" onClick={onLogout} className="text-left text-sm font-medium text-red-600">
            Logout
          </button>
        </>
      )}
    </div>
  );
}
