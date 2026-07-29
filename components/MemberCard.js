export default function MemberCard({ member }) {
  return (
    <div className="rounded-card border border-line bg-surface px-4 py-5 text-center transition-transform duration-200 hover:-translate-y-[3px] hover:shadow-[0_14px_28px_-16px_rgba(20,46,40,0.22)]">
      <div className="mx-auto mb-2.5 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-moss text-sm font-bold text-white">
        {member.initials}
      </div>
      <div className="text-sm font-semibold text-heading">{member.name}</div>
      <div className="mt-[3px] text-[11px] text-muted">{member.role}</div>
      <div className="mt-2 font-mono-sans text-[10.5px] text-brass">{member.batch}</div>
      <div className="mt-2.5 inline-flex items-center gap-1 text-[10px] text-moss">
        ✓ Verified
      </div>
    </div>
  );
}
