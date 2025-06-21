"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

type HeaderProps = {
  title: string;
  href: string;
  links?: { title: string; href: string }[];
};

export default function Header({ title, href, links }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-card shadow-sm dark:shadow-zinc-900/30 h-14 flex items-center px-4 sm:px-8">
      <Link href={href} className="text-xl font-bold text-primary flex-grow">
        {title}
      </Link>
      <button
        className="sm:hidden text-primary ml-auto"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <FaBars size={24} />
      </button>
      {(links && links.length > 0) &&  <nav
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute top-14 left-0 w-full bg-card shadow-md sm:static sm:block sm:shadow-none bg-white`}
      >
        <ul className="flex flex-col sm:flex-row">
          {links?.map((link: { title: string; href: string }) => (
            <li key={link.href} className="p-2 sm:ml-4">
              <Link href={link.href} className="text-primary">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>}
    </header>
  );
}
