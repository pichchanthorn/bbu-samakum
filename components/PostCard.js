export default function PostCard({ post }) {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-line bg-surface p-[22px] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_-14px_rgba(20,46,40,0.25)]">
      <div className="flex items-center gap-2.5">
        <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-moss text-xs font-bold text-white">
          {post.authorInitials}
        </div>
        <div>
          <div className="text-[13.5px] font-semibold text-heading">{post.author}</div>
          <div className="font-mono-sans text-[11px] text-brass">{post.meta}</div>
        </div>
      </div>
      <div className="text-base leading-snug font-semibold text-heading">{post.title}</div>
      <div className="grow text-[13.5px] text-muted">{post.excerpt}</div>
      <div className="flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-paper-2 px-2.5 py-[3px] text-[10.5px] text-moss"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-line pt-2.5 text-xs text-faint">
        <span className="inline-flex items-center gap-1">♡ {post.likes}</span>
        <span className="inline-flex items-center gap-1">💬 {post.comments}</span>
        <span>{post.time}</span>
      </div>
    </div>
  );
}
