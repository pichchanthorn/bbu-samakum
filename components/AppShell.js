"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "./Sidebar";
import Logo from "./Logo";

export default function AppShell({ children }) {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <>
      <div
        onClick={close}
        className={`fixed inset-0 z-[70] bg-[rgba(20,20,16,0.4)] min-[881px]:hidden ${
          open ? "block" : "hidden"
        }`}
      />

      <div className="flex min-h-screen items-stretch">
        <Sidebar open={open} onNavigate={close} />

        <div className="min-w-0 flex-1">
          <div className="sticky top-0 z-[60] flex items-center justify-between border-b border-line bg-paper/90 px-5 py-3.5 backdrop-blur-sm min-[881px]:hidden">
            <Link href="/" onClick={close} className="flex items-center gap-2.5">
              <Logo size={36} className="shrink-0" />
              <div className="text-[16.5px] font-bold text-heading">BBU Samakum</div>
            </Link>
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="flex flex-col gap-[5px] border-none bg-transparent p-1.5"
            >
              <span className="block h-0.5 w-[22px] bg-ink" />
              <span className="block h-0.5 w-[22px] bg-ink" />
              <span className="block h-0.5 w-[22px] bg-ink" />
            </button>
          </div>

          {children}

          <footer className="mt-5 border-t border-line px-8 py-10 pt-10 pb-15 max-[880px]:px-5">
            <div className="mx-auto flex max-w-[1080px] flex-wrap justify-between gap-2.5 font-mono-sans text-[11.5px] text-faint">
              <span>© 2026 BBU Samakum — Prototype Preview</span>
              <span>IT Department · BBU</span>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
