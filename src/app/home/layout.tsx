"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { BookOpen, CalendarDays, Home, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-700">
        <Loader2 className="animate-spin text-white w-10 h-10" />
      </div>
    ); // or spinner

  if (!isAuthenticated) return null;
  return (
    <>
      <div className="pb-12">{children}</div>
      <BottomNav />
    </>
  );
}

function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/home/blog", label: "Blog", icon: BookOpen },
    { href: "/home/dashboard", label: "Dashboard", icon: Home },
    { href: "/home/events", label: "Events", icon: CalendarDays },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-800/50 backdrop-blur-md shadow-lg  rounded-lg px-6 py-4 flex justify-between w-[90%] max-w-md z-50">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center text-sm"
          >
            <Icon
              className={`h-5 w-5 mb-1 transition-all ${
                isActive
                  ? "text-white -700 font-semibold scale-[1.25]"
                  : "text-white -600"
              }`}
            />
            <span
              className={`transition-all ${
                isActive ? "text-white -700 font-semibold" : "text-white -600"
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
