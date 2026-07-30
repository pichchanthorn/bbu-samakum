import { CodeIcon, RobotIcon, DisconnectGridIcon, HeartIcon, MessageIcon, EyeIcon } from "./icons";

const coverIcons = {
  "cover-a": CodeIcon,
  "cover-b": RobotIcon,
  "cover-c": DisconnectGridIcon,
};

const coverBg = {
  "cover-a": "linear-gradient(135deg, var(--ink), var(--moss))",
  "cover-b": "linear-gradient(135deg, var(--moss), var(--brass))",
  "cover-c": "linear-gradient(135deg, var(--brass), var(--ink))",
};

export default function BigPostCard({ post }) {
  const Icon = coverIcons[post.cover];

  return (
    <div className="overflow-hidden rounded-card border border-line bg-surface transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-18px_rgba(20,46,40,0.3)]">
      <div className="flex items-center gap-2.5 px-[18px] pt-4 pb-1">
        <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-moss text-xs font-bold text-white">
          {post.authorInitials}
        </div>
        <div>
          <div className="text-[13.5px] font-semibold text-heading">{post.author}</div>
          <div className="font-mono-sans text-[11.5px] text-faint">{post.meta}</div>
        </div>
      </div>
      <div
        className="relative mx-[18px] mt-3 flex h-[150px] items-center justify-center overflow-hidden rounded-[10px]"
        style={{ background: coverBg[post.cover] }}
      >
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-[rgba(251,249,244,0.95)] ring-1 ring-white/25 backdrop-blur-sm">
          <Icon size={30} />
        </div>
      </div>
      <div className="px-[18px] pt-3.5 text-[17px] font-bold text-heading">
        {post.title}
      </div>
      <div className="px-[18px] pt-1.5 text-[13.5px] text-muted">{post.excerpt}</div>
      <div className="mt-2.5 flex items-center justify-between border-t border-line px-[18px] pt-3.5 pb-4 text-[12.5px] text-faint">
        <div className="flex gap-4">
          <span className="inline-flex items-center gap-1.5">
            <HeartIcon size={14} /> {post.likes}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MessageIcon size={14} /> {post.comments}
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5">
          <EyeIcon size={14} /> {post.views}
        </span>
      </div>
    </div>
  );
}
