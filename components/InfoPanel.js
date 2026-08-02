import Link from "next/link";
import Logo from "./Logo";
import { infoPanel } from "@/lib/mock-data";

export default function InfoPanel({
  note = infoPanel.note,
  ctaLabel = "Sign in to post",
  ctaHref = "/sign-in",
}) {
  return (
    <div className="sticky top-6 flex flex-col gap-4 rounded-card border border-line bg-surface p-[22px] max-[1080px]:static">
      <div className="flex items-center gap-2.5">
        <Logo size={34} className="shrink-0" />
        <div className="text-[15px] font-bold text-heading">{infoPanel.name}</div>
      </div>
      <p className="text-[12.5px] text-muted">{infoPanel.tagline}</p>
      <div className="grid grid-cols-2 gap-3">
        {infoPanel.stats.map((s) => (
          <div key={s.label} className="rounded-[10px] bg-paper-2 px-3 py-2.5">
            <div className="font-mono-sans text-base font-bold text-heading">{s.num}</div>
            <div className="mt-0.5 text-[10.5px] text-moss">{s.label}</div>
          </div>
        ))}
      </div>
      {note && (
        <div className="rounded-[10px] border border-dashed border-line bg-paper px-3 py-2.5 text-[11.5px] text-muted">
          {note}
        </div>
      )}
      <Link
        href={ctaHref}
        className="block w-full rounded-full border border-ink bg-ink px-5 py-2.5 text-center text-sm font-semibold text-white transition-[transform,background] duration-150 hover:-translate-y-px hover:bg-moss"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
