"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

function HeaderComponent() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  return (
    <header className="flex items-center justify-between py-4 px-6 bg-white">
      <Link href="/" className="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
        <span className="text-xl font-bold">ZapFill</span>
      </Link>

      <nav className="hidden md:flex items-center space-x-4">
        <Link href="/about" className="text-gray-600 hover:text-gray-900">
          About Us
        </Link>
        <Link href="/help" className="text-gray-600 hover:text-gray-900">
          Help & Support
        </Link>
      </nav>

      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/stephanie.png" alt="Stephanie" />
                  <AvatarFallback>SN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/logout")}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link href="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

const Header = dynamic(() => Promise.resolve(HeaderComponent), {
  ssr: false,
  loading: () => (
    <header className="flex items-center justify-between py-4 px-6 bg-white">
      <div className="h-6 w-6" />
    </header>
  ),
});

export { Header };
