"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function UserProfileButton() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2"
      >
        <img
          src={user.imageUrl}
          className="w-9 h-9 rounded-full ring-2 ring-green-400/40 hover:ring-green-400 transition-all duration-300"
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="
              absolute right-0 top-12 w-56 p-4 rounded-xl border border-white/10
              bg-[#1A1A23]/90 backdrop-blur-xl shadow-2xl
            "
          >
            {/* Header */}
            <div className="flex flex-col items-start gap-1 mb-3">
              <p className="text-xs uppercase tracking-wide text-white/40">
                Signed in as
              </p>
              <p className="font-medium text-white">
                {user.fullName || user.emailAddresses[0].emailAddress}
              </p>
            </div>

            <div className="h-[1px] bg-white/10 my-2" />

            {/* Menu Items */}
            <ul className="flex flex-col gap-1">
              <MenuItem href="/profile">Profile</MenuItem>
              <MenuItem href="/snippets">Snippets</MenuItem>
            </ul>

            <div className="h-[1px] bg-white/10 my-2" />

            {/* Sign Out */}
            <SignOutButton>
              <button className="w-full text-left px-2 py-2 text-red-500 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition">
                Sign Out
              </button>
            </SignOutButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuItem({ href, children }: any) {
  return (
    <Link
      href={href}
      className="
        px-2 py-2 rounded-lg text-white/80
        hover:bg-white/10 hover:text-white
        transition
      "
    >
      {children}
    </Link>
  );
}
