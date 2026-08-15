"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheckIcon } from "./icons";
import { createClient } from "@/lib/supabase/client";

// Matches the literal value seed.sql and every existing profiles row
// already store in this column — see app/members/page.js's formatRole,
// which strips this exact "Department of " prefix for display. The site
// is IT-Department-only right now, so this is never a user choice.
const DEPARTMENT = "Department of Information Technology";
const YEARS = [1, 2, 3, 4];

export default function ProfileCompletionForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");
  const [year, setYear] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const trimmedName = name.trim();
  const canSubmit = trimmedName.length > 0 && !loading;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    setError("");
    setLoading(true);

    const supabase = createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      setError("Your session expired. Please sign in again.");
      setLoading(false);
      return;
    }

    // initials is intentionally left out of this update — profiles has a
    // before-update trigger (derive_profile_initials, from 0001_init.sql)
    // that derives it from `name` automatically whenever initials is null,
    // which it already is for every incomplete profile. Setting it here
    // too would just be a second, riskier reimplementation of the same
    // first-letter-of-first-two-words logic that already lives in SQL.
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        name: trimmedName,
        role,
        batch: role === "lecturer" ? "Faculty" : `Year ${year}`,
        department: DEPARTMENT,
      })
      .eq("id", userData.user.id);

    if (updateError) {
      setError(updateError.message || "Couldn't save your profile. Please try again.");
      setLoading(false);
      return;
    }

    router.replace("/");
  }

  return (
    <div className="w-full max-w-[400px] rounded-[20px] border border-line bg-surface px-[34px] py-[38px] shadow-[0_20px_50px_-22px_rgba(20,46,40,0.2)]">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-moss bg-[#DDEBE3] text-moss">
        <ShieldCheckIcon size={24} />
      </span>
      <h2 className="mb-1.5 text-[21px] text-heading">One last step</h2>
      <p className="mb-[22px] text-[13px] text-muted">
        Help other members recognize you — this is how your name and role
        show up across the feed, showcase, and member directory.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-heading">
            Full name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            maxLength={80}
            onChange={(e) => setName(e.target.value)}
            placeholder="Sok Dara"
            className="w-full rounded-[10px] border border-line px-3.5 py-2.5 text-[13.5px] text-charcoal outline-none placeholder:text-faint focus:border-moss"
          />
        </div>

        <div className="mb-4">
          <span className="mb-1.5 block text-xs font-semibold text-heading">I am a</span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: "student", label: "Student" },
              { value: "lecturer", label: "Lecturer" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setRole(option.value)}
                aria-pressed={role === option.value}
                className={`rounded-[10px] border py-2.5 text-[13px] font-semibold transition-colors duration-150 ${
                  role === option.value
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-paper text-charcoal hover:bg-paper-2"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {role === "student" && (
          <div className="mb-4">
            <span className="mb-1.5 block text-xs font-semibold text-heading">Year level</span>
            <div className="grid grid-cols-4 gap-2">
              {YEARS.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setYear(y)}
                  aria-pressed={year === y}
                  className={`rounded-[10px] border py-2.5 text-[13px] font-semibold transition-colors duration-150 ${
                    year === y
                      ? "border-ink bg-ink text-white"
                      : "border-line bg-paper text-charcoal hover:bg-paper-2"
                  }`}
                >
                  Year {y}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && <p className="mb-4 text-[11.5px] text-stamp">{error}</p>}

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-0.5 w-full rounded-full border border-ink bg-ink py-3 text-center text-sm font-semibold text-white transition-[transform,background] duration-150 hover:-translate-y-px hover:bg-moss disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {loading ? "Saving..." : "Save and continue"}
        </button>
      </form>
    </div>
  );
}
