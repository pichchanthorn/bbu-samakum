import { MessageIcon } from "./icons";
import LikeButton from "./LikeButton";

export default function PostCard({ post, userId }) {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-line bg-surface p-5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_-14px_rgba(20,46,40,0.25)]">
      <div className="flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-moss text-xs font-bold text-white">
            {post.authorInitials}
          </div>
          <div>
            <div className="text-[13.5px] font-semibold text-heading">{post.author}</div>
            <div className="font-mono-sans text-[11px] tracking-[0.01em] text-brass">{post.meta}</div>
          </div>
        </div>
        {post.category && (
          <span className="shrink-0 rounded-full bg-paper-2 px-2.5 py-1 font-mono-sans text-[9.5px] font-semibold tracking-[0.06em] text-moss uppercase">
            {post.category}
          </span>
        )}
      </div>
      <div className="text-[18.5px] leading-snug font-bold tracking-[-0.005em] text-heading">
        {post.title}
      </div>
      <div className="grow text-[14px] leading-relaxed text-muted">{post.excerpt}</div>
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
        <LikeButton
          postId={post.id}
          initialLiked={post.liked}
          initialCount={post.likes}
          userId={userId}
          size={13}
        />
        <span className="inline-flex items-center gap-1.5">
          <MessageIcon size={13} /> {post.comments}
        </span>
        <span className="font-mono-sans">{post.time}</span>
      </div>
    </div>
  );
}
