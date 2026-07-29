"use client";

import { useState } from "react";
import { CheckIcon } from "./icons";

export default function IdCard({ member }) {
  const [flipped, setFlipped] = useState(false);

  function toggle() {
    setFlipped((f) => !f);
  }

  function onKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  }

  return (
    <div style={{ perspective: "1400px" }}>
      <div
        role="button"
        tabIndex={0}
        aria-label="Click to see the back of the member card"
        onClick={toggle}
        onKeyDown={onKeyDown}
        className="relative mx-auto w-full max-w-[320px] cursor-pointer transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
        style={{
          aspectRatio: "1.58 / 1",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-[18px] border border-black/[0.06] p-5 px-[22px] text-white shadow-[0_18px_40px_-12px_rgba(20,46,40,0.35)]"
          style={{
            backfaceVisibility: "hidden",
            background:
              "linear-gradient(155deg, var(--ink) 0%, #1D4038 62%, var(--moss) 100%)",
          }}
        >
          <div className="flex items-start justify-between">
            <span className="font-mono-sans text-[10px] tracking-[0.02em] text-brass-light">
              BBU SAMAKUM • MEMBER
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full border-[1.5px] border-brass-light text-brass-light">
              <CheckIcon size={12} />
            </span>
          </div>
          <div className="my-3 flex items-center gap-3.5">
            <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border-2 border-brass-light bg-brass text-lg font-bold text-ink">
              {member.initials}
            </div>
            <div>
              <div className="text-[17px] font-bold">{member.name}</div>
              <div className="mt-0.5 text-[11.5px] text-[#CFE3D9]">
                {member.department}
              </div>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <span className="font-mono-sans text-[10px] tracking-[0.02em] text-brass-light">
              ID: {member.idNumber}
            </span>
            <span className="text-[9.5px] text-[#9FBBAF]">Tap to see back →</span>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 rounded-[18px] border border-black/[0.06] p-5 px-[22px] text-center shadow-[0_18px_40px_-12px_rgba(20,46,40,0.35)]"
          style={{
            backfaceVisibility: "hidden",
            background: "#FBF9F2",
            transform: "rotateY(180deg)",
          }}
        >
          <div
            className="flex h-[78px] w-[78px] rotate-[-8deg] items-center justify-center rounded-full border-2 border-dashed text-[9px] leading-tight font-bold"
            style={{ borderColor: "var(--stamp)", color: "var(--stamp)" }}
          >
            VERIFIED
            <br />
            EMAIL
          </div>
          <div className="max-w-[220px] text-[11px] text-[#6b6656]">
            {member.verifiedNote}
          </div>
          <div
            className="mt-1 h-5 w-[80%] opacity-75"
            style={{
              background:
                "repeating-linear-gradient(90deg, var(--ink) 0 2px, transparent 2px 5px)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
