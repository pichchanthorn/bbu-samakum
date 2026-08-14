import { CodeIcon, MonitorIcon, GridIcon, MessageIcon, EyeIcon } from "./icons";
import LikeButton from "./LikeButton";

// post.icon is a real (if previously unused) content-type signal — reusing
// it here instead of leaving image upload's absence as flat, meaningless
// gradient space. Each type gets its own icon + label so the placeholder
// band reads as a tag, not a missing photo.
const typeTag = {
  arrows: { Icon: CodeIcon, label: "Insight" },
  laptop: { Icon: MonitorIcon, label: "Dev note" },
  grid: { Icon: GridIcon, label: "Project" },
};

const coverBg = {
  "cover-a": "linear-gradient(135deg, var(--ink), var(--moss))",
  "cover-b": "linear-gradient(135deg, var(--moss), var(--brass))",
  "cover-c": "linear-gradient(135deg, var(--brass), var(--ink))",
};

export default function BigPostCard({ post, userId }) {
  const { Icon, label } = typeTag[post.icon] ?? typeTag.arrows;

  return (
    <div className="overflow-hidden rounded-card border border-line bg-surface transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-18px_rgba(20,46,40,0.3)]">
      <div className="flex items-center gap-2.5 px-5 pt-4 pb-3.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-moss text-xs font-bold text-white">
          {post.authorInitials}
        </div>
        <div>
          <div className="text-[13.5px] font-semibold text-heading">{post.author}</div>
          <div className="font-mono-sans text-[11px] tracking-[0.01em] text-faint">{post.meta}</div>
        </div>
      </div>

      <div
        className="mx-5 flex items-center gap-2 rounded-[8px] px-3 py-2"
        style={{ background: coverBg[post.cover] }}
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-[rgba(251,249,244,0.95)]">
          <Icon size={13} />
        </span>
        <span className="font-mono-sans text-[10px] font-semibold tracking-[0.09em] text-[rgba(251,249,244,0.9)] uppercase">
          {label}
        </span>
      </div>

      <div className="px-5 pt-4 text-[18.5px] leading-snug font-bold tracking-[-0.005em] text-heading">
        {post.title}
      </div>
      <div className="px-5 pt-1.5 text-[14px] leading-relaxed text-muted">{post.excerpt}</div>
      <div className="mt-3.5 flex items-center justify-between border-t border-line px-5 pt-3.5 pb-4 text-[12.5px] text-faint">
        <div className="flex gap-4">
          <LikeButton
            postId={post.id}
            initialLiked={post.liked}
            initialCount={post.likes}
            userId={userId}
            size={14}
          />
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
