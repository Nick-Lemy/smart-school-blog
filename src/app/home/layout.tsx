"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { BookOpen, CalendarDays, Home } from "lucide-react";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>{children}</div>
      <BottomNav />
    </>
  );
}

function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/home/dashboard", label: "Dashboard", icon: Home },
    { href: "/home/blog", label: "Blog", icon: BookOpen },
    { href: "/home/events", label: "Events", icon: CalendarDays },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md shadow-lg border border-gray-200 rounded-2xl px-6 py-2 flex justify-between w-[90%] max-w-md z-50">
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
                isActive ? "text-black" : "text-gray-400"
              }`}
            />
            <span
              className={`transition-all ${
                isActive ? "text-black font-semibold" : "text-gray-400"
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
