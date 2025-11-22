"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function UserProfileButton() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  // TypeScript fix: ref is a div element
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger */}
      <button
        className="flex items-center gap-2"
        onClick={() => setOpen(!open)}
      >
        <img src={user.imageUrl} className="w-8 h-8 rounded-full" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-12 bg-[#1e1e2e] border border-gray-700 p-3 rounded-xl shadow-lg w-48">
          <p className="font-medium text-white/60 mb-2">My Account</p>

          <div className="bg-black/50 p-2 rounded-lg mb-2">
            <span>{user.fullName || user.emailAddresses[0].emailAddress}</span>
          </div>

          <Link
            href="/profile"
            className="block w-full text-left py-2 hover:text-white"
          >
            Profile
          </Link>

          <SignOutButton>
            <button className="block w-full text-left py-2 text-red-600 hover:text-red-400">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      )}
    </div>
  );
}
