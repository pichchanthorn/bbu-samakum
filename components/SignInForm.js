"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MailIcon, CheckIcon } from "./icons";
import { createClient } from "@/lib/supabase/client";

const UNIVERSITY_DOMAIN = "@pp.bbu.edu.kh";
const STEPS = [
  { key: 1, label: "Email" },
  { key: 2, label: "OTP" },
  { key: 3, label: "Verified" },
];

export default function SignInForm() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  // If the user clicked the emailed confirmation link instead of typing a
  // code, app/auth/confirm/route.js already exchanged it for a session and
  // redirected here — this only runs when that exchange failed, to surface
  // the reason via the same error UI used for the manual-entry path.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const linkError = params.get("error");
    if (linkError) {
      // One-time sync from the URL (an external system) on mount, not
      // state derived from props/other state — the case this rule doesn't
      // cover.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError(linkError);
      params.delete("error");
      const query = params.toString();
      window.history.replaceState({}, "", query ? `?${query}` : window.location.pathname);
    }
  }, []);

  async function handleEmailSubmit(e) {
    e.preventDefault();
    const value = email.trim().toLowerCase();

    // This is just a fast-feedback UX check. It runs entirely in the
    // browser and can be bypassed by anyone calling Supabase directly, so
    // it is NOT the security boundary — that's the "Before User Created"
    // Auth Hook enforced server-side (supabase/migrations/0002_domain_restriction.sql),
    // which rejects the OTP request no matter how it's sent.
    if (!value.endsWith(UNIVERSITY_DOMAIN)) {
      setError(`Use a university email ending in ${UNIVERSITY_DOMAIN}`);
      return;
    }

    setError("");
    setLoading(true);
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: value,
      options: {
        shouldCreateUser: true,
        // Without this, GoTrue's hosted verify page falls back to
        // redirecting to the dashboard's Site URL (the site root), which
        // has nothing to exchange the code for a session —
        // app/auth/confirm/route.js is what actually does that.
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    });
    setLoading(false);

    if (otpError) {
      setError(otpError.message);
      return;
    }

    setEmail(value);
    setStep(2);
  }

  async function handleOtpSubmit(e) {
    e.preventDefault();
    const code = otp.trim();
    if (!/^\d{6}$/.test(code)) {
      setError("Enter the 6-digit code we sent you.");
      return;
    }

    setError("");
    setLoading(true);
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });
    setLoading(false);

    if (verifyError) {
      setError(verifyError.message);
      return;
    }

    setStep(3);
  }

  function changeEmail() {
    setStep(1);
    setOtp("");
    setError("");
  }

  return (
    <div className="w-full max-w-[400px] rounded-[20px] border border-line bg-surface px-[34px] py-[38px] shadow-[0_20px_50px_-22px_rgba(20,46,40,0.2)]">
      <div className="mb-4 inline-block rounded-full bg-paper-2 px-3 py-[5px] font-mono-sans text-[11px] text-moss">
        STEP {step} OF 3
      </div>

      {step === 1 && (
        <>
          <h2 className="mb-1.5 text-[21px] text-heading">Sign in to BBU Samakum</h2>
          <p className="mb-[22px] text-[13px] text-muted">
            Use your university email to continue. Currently open to BBU IT
            Department students and lecturers only.
          </p>

          <form onSubmit={handleEmailSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-heading">
                University email
              </label>
              <div className="flex items-center gap-2.5 rounded-[10px] border border-line px-3.5 py-2.5 text-faint focus-within:border-moss">
                <MailIcon size={16} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@pp.bbu.edu.kh"
                  className="flex-1 bg-transparent text-[13.5px] text-charcoal outline-none placeholder:text-faint"
                />
              </div>
              {error && <p className="mt-1.5 text-[11.5px] text-stamp">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-0.5 w-full rounded-full border border-ink bg-ink py-3 text-center text-sm font-semibold text-white transition-[transform,background] duration-150 hover:-translate-y-px hover:bg-moss disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? "Sending code..." : "Send verification code"}
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
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="mb-1.5 text-[21px] text-heading">Enter your code</h2>
          <p className="mb-[22px] text-[13px] text-muted">
            We sent a 6-digit code to <span className="font-semibold text-heading">{email}</span>.
          </p>

          <form onSubmit={handleOtpSubmit}>
            <div className="mb-4">
              <label htmlFor="otp" className="mb-1.5 block text-xs font-semibold text-heading">
                Verification code
              </label>
              <input
                id="otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^\d]/g, ""))}
                placeholder="000000"
                className="w-full rounded-[10px] border border-line px-3.5 py-2.5 text-center font-mono-sans text-lg tracking-[0.4em] text-charcoal outline-none placeholder:text-faint focus:border-moss"
              />
              {error && <p className="mt-1.5 text-[11.5px] text-stamp">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-0.5 w-full rounded-full border border-ink bg-ink py-3 text-center text-sm font-semibold text-white transition-[transform,background] duration-150 hover:-translate-y-px hover:bg-moss disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? "Verifying..." : "Verify code"}
            </button>
          </form>

          <button
            type="button"
            onClick={changeEmail}
            className="mt-[18px] w-full text-center text-[12.5px] font-semibold text-moss hover:underline"
          >
            Use a different email
          </button>
        </>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center py-4 text-center">
          <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-moss bg-[#DDEBE3] text-moss">
            <CheckIcon size={26} />
          </span>
          <h2 className="mb-1.5 text-[21px] text-heading">You&apos;re verified</h2>
          <p className="mb-[26px] text-[13px] text-muted">
            {email} is now a verified member of the BBU IT Department community.
          </p>
          <Link
            href="/"
            className="block w-full rounded-full border border-ink bg-ink py-3 text-center text-sm font-semibold text-white transition-[transform,background] duration-150 hover:-translate-y-px hover:bg-moss"
          >
            Go to the community feed
          </Link>
        </div>
      )}

      <div className="mt-6 flex justify-between">
        {STEPS.map((s) => {
          const done = step > s.key;
          const current = step === s.key;
          return (
            <div key={s.key} className="flex-1 text-center">
              <div
                className={`mx-auto mb-1.5 flex h-5 w-5 items-center justify-center rounded-full border text-[9.5px] ${
                  done
                    ? "border-moss bg-moss text-white"
                    : current
                      ? "border-brass bg-brass text-white"
                      : "border-line bg-paper-2 text-faint"
                }`}
              >
                {done ? <CheckIcon size={10} /> : s.key}
              </div>
              <small className="text-[9.5px] text-faint">{s.label}</small>
            </div>
          );
        })}
      </div>

      <div className="mt-[18px] text-center text-[11px] text-faint">
        By continuing you agree this account belongs to a current BBU IT
        Department student or lecturer.
      </div>
    </div>
  );
}
