"use client";

import { useState } from "react";
import Link from "next/link";
import { MailIcon } from "./icons";

export default function SignInForm() {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Wire up to a real backend (e.g. Supabase Auth email OTP) here.
  }

  return (
    <div className="w-full max-w-[400px] rounded-[20px] border border-line bg-surface px-[34px] py-[38px] shadow-[0_20px_50px_-22px_rgba(20,46,40,0.2)]">
      <div className="mb-4 inline-block rounded-full bg-paper-2 px-3 py-[5px] font-mono-sans text-[11px] text-moss">
        STEP 1 OF 3
      </div>
      <h2 className="mb-1.5 text-[21px] text-heading">Sign in to BBU Samakum</h2>
      <p className="mb-[22px] text-[13px] text-muted">
        Use your university email to continue. Currently open to BBU IT
        Department students and lecturers only.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-semibold text-heading">
            University email
          </label>
          <div className="flex items-center gap-2.5 rounded-[10px] border border-line px-3.5 py-2.5 text-faint">
            <MailIcon size={16} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourname@pp.bbu.edu.kh"
              className="flex-1 bg-transparent text-[13.5px] text-charcoal outline-none placeholder:text-faint"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-0.5 w-full rounded-full border border-ink bg-ink py-3 text-center text-sm font-semibold text-white transition-[transform,background] duration-150 hover:-translate-y-px hover:bg-moss"
        >
          Send verification code
        </button>
      </form>

      <div className="my-[22px] flex items-center gap-2.5 text-[10.5px] text-faint before:h-px before:flex-1 before:bg-line after:h-px after:flex-1 after:bg-line">
        OR
      </div>

      <Link
        href="/about"
        className="block w-full rounded-full border border-heading py-3 text-center text-sm font-semibold text-heading transition-[transform,background] duration-150 hover:-translate-y-px hover:bg-moss hover:text-white"
      >
        Learn how verification works
      </Link>

      <div className="mt-1.5 flex justify-between">
        <div className="flex-1 text-center">
          <div className="mx-auto mb-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-moss bg-moss text-[9.5px] text-white">
            ✓
          </div>
          <small className="text-[9.5px] text-faint">Email</small>
        </div>
        <div className="flex-1 text-center">
          <div className="mx-auto mb-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-line bg-paper-2 text-[9.5px] text-faint">
            2
          </div>
          <small className="text-[9.5px] text-faint">OTP</small>
        </div>
        <div className="flex-1 text-center">
          <div className="mx-auto mb-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-line bg-paper-2 text-[9.5px] text-faint">
            3
          </div>
          <small className="text-[9.5px] text-faint">Verified</small>
        </div>
      </div>

      <div className="mt-[18px] text-center text-[11px] text-faint">
        By continuing you agree this account belongs to a current BBU IT
        Department student or lecturer.
      </div>
    </div>
  );
}
