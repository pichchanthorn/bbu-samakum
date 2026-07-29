"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import { SearchIcon, HomeIcon, GridIcon, ShowcaseIcon, MembersIcon, InfoIcon } from "./icons";
import { navItems } from "@/lib/mock-data";

const iconMap = {
  home: HomeIcon,
  grid: GridIcon,
  showcase: ShowcaseIcon,
  members: MembersIcon,
  about: InfoIcon,
};

export default function Sidebar({ open, onNavigate }) {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");

  function onSearchSubmit(e) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/showcase?q=${encodeURIComponent(q)}` : "/showcase");
    onNavigate?.();
  }

  return (
    <aside
      className={`fixed top-0 left-0 z-[80] flex h-screen w-[252px] shrink-0 flex-col overflow-y-auto border-r border-line bg-surface p-4 px-4 transition-transform duration-300 ease-out min-[881px]:sticky min-[881px]:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center gap-2.5 px-2 pt-1.5 pb-5"
      >
        <Logo size={36} className="shrink-0" />
        <div>
          <div className="text-[16.5px] font-bold text-heading">BBU Samakum</div>
          <div className="font-mono-sans text-[10.5px] text-moss">IT DEPARTMENT</div>
        </div>
      </Link>

      <form
        onSubmit={onSearchSubmit}
        className="mb-[18px] flex items-center gap-2 rounded-[10px] border border-line px-3 py-2.5 text-faint focus-within:border-moss"
      >
        <SearchIcon size={15} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          aria-label="Search posts"
          className="flex-1 bg-transparent text-[13px] text-charcoal outline-none placeholder:text-faint"
        />
      </form>

      <nav className="flex flex-col gap-[3px]">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                active
                  ? "bg-ink text-white [&_svg]:text-brass-light"
                  : "text-charcoal hover:bg-paper-2 [&_svg]:text-faint"
              }`}
            >
              <Icon />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-3 border-t border-line pt-4">
        <ThemeToggle />
        <Link
          href="/sign-in"
          onClick={onNavigate}
          className="block w-full rounded-full border border-ink bg-ink px-5 py-2.5 text-center text-sm font-semibold text-white transition-[transform,background] duration-150 hover:-translate-y-px hover:bg-moss"
        >
          Sign In
        </Link>
      </div>
    </aside>
  );
}
