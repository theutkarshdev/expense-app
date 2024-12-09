"use client";
import React from "react";
import { HomeIcon, PlusCircleIcon, SearchIcon, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const NavBarBottom = () => {
  const pathname = usePathname();

  // Navigation items
  const navItems = [
    { href: "/dashboard", label: "Home", Icon: HomeIcon },
    { href: "/search", label: "Search", Icon: SearchIcon },
    { href: "/add-person", label: "Add Friend", Icon: PlusCircleIcon },
    { href: "/account", label: "Account", Icon: UserCircle },
  ];

  return (
    <nav className="w-full px-3 py-4 border-t bg-white flex justify-evenly rounded-t-2xl overflow-hidden shadow-md">
      {navItems.map(({ href, label, Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex flex-col items-center text-xs ${
            pathname === href ? "text-primary font-semibold" : "text-gray-600"
          } transition-colors`}
          aria-label={label}>
          <Icon size={20} className={`${pathname === href ? "text-primary" : "text-gray-400"}`} />
          <p>{label}</p>
        </Link>
      ))}
    </nav>
  );
};

export default NavBarBottom;
