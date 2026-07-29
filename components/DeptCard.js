"use client";

import { useRouter } from "next/navigation";
import { MonitorIcon, LockedIcon } from "./icons";

export default function DeptCard({ dept }) {
  const router = useRouter();

  if (!dept.active) {
    return (
      <div className="flex cursor-not-allowed flex-col gap-2.5 rounded-card border border-line bg-paper-2 p-5 text-faint opacity-75">
        <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[rgba(20,46,40,0.06)] text-faint">
          <LockedIcon size={17} />
        </div>
        <div className="text-[14.5px] font-semibold text-muted">{dept.name}</div>
        <div className="grow text-xs text-muted">{dept.desc}</div>
        <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[rgba(20,46,40,0.08)] px-2.5 py-1 text-[10px] text-faint">
          {dept.statusLabel}
        </div>
      </div>
    );
  }

  function onKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      router.push("/");
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => router.push("/")}
      onKeyDown={onKeyDown}
      className="flex cursor-pointer flex-col gap-2.5 rounded-card border border-moss bg-surface p-5 shadow-[0_14px_30px_-18px_rgba(20,46,40,0.3)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_16px_34px_-16px_rgba(20,46,40,0.3)]"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-ink text-brass-light">
        <MonitorIcon size={17} />
      </div>
      <div className="text-[14.5px] font-semibold text-heading">{dept.name}</div>
      <div className="grow text-xs text-muted">{dept.desc}</div>
      <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#DDEBE3] px-2.5 py-1 text-[10px] text-moss">
        ● {dept.statusLabel}
      </div>
      <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-moss">
        Enter IT Department →
      </span>
    </div>
  );
}
