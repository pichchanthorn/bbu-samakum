"use client";

import { useState } from "react";
import BigPostCard from "./BigPostCard";
import { useCreatePost } from "@/lib/useCreatePost";
import { displayName, displayInitials, authorMetaParts, normalizeCover } from "@/lib/postDisplay";

const PAGE_SIZE = 3;
const MAX_LENGTH = 500;

export default function HomeFeed({ initialPosts, userId, authorProfile }) {
  const [posts, setPosts] = useState(initialPosts);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [draft, setDraft] = useState("");
  const { createPost, pending, error, setError } = useCreatePost();

  const trimmed = draft.trim();
  const tooLong = draft.length > MAX_LENGTH;
  const canSubmit = trimmed.length > 0 && !tooLong && !pending;

  async function handlePost() {
    if (!canSubmit) return;
    if (!userId) {
      setError("Sign in to post.");
      return;
    }

    const title = trimmed.length > 70 ? `${trimmed.slice(0, 70)}…` : trimmed;
    const row = await createPost({
      type: "feed",
      author_id: userId,
      title,
      excerpt: trimmed,
    });

    if (!row) return; // useCreatePost already set the error message

    const { cover, icon } = normalizeCover(row);
    setPosts((prev) => [
      {
        id: row.id,
        authorInitials: displayInitials(authorProfile?.initials),
        author: displayName(authorProfile?.name),
        meta: `${authorMetaParts(authorProfile)} · Just now`,
        cover,
        icon,
        title: row.title,
        excerpt: row.excerpt ?? "",
        likes: 0,
        liked: false,
        comments: 0,
        views: row.views ?? 0,
      },
      ...prev,
    ]);
    setVisible((v) => v + 1);
    setDraft("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlePost();
    }
  }

  return (
    <div className="flex flex-col gap-[18px]">
      <div className="mb-5 flex flex-col gap-2 rounded-card border border-line bg-surface px-4 py-3.5">
        <div className="flex items-start gap-3">
          <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-moss text-xs font-bold text-white">
            {displayInitials(authorProfile?.initials)}
          </div>
          <textarea
            rows={1}
            maxLength={MAX_LENGTH}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Share something with the IT Department..."
            aria-label="Share something with the IT Department"
            className="max-h-40 min-h-[42px] flex-1 resize-y rounded-[18px] border border-line bg-paper px-4 py-2.5 text-[13.5px] text-charcoal outline-none placeholder:text-faint focus:border-moss"
          />
          <button
            type="button"
            onClick={handlePost}
            disabled={!canSubmit}
            className="shrink-0 rounded-full border border-ink bg-ink px-[18px] py-2.5 text-center text-[13px] font-semibold text-white transition-[transform,background,opacity] duration-150 hover:-translate-y-px hover:bg-moss disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 disabled:hover:bg-ink"
          >
            {pending ? "Posting..." : "Post"}
          </button>
        </div>
        <div className="flex items-center justify-between pl-[46px] text-[11px]">
          {error ? (
            <span role="status" className="text-stamp">
              {error}
            </span>
          ) : (
            <span />
          )}
          <span className={tooLong ? "text-stamp" : "text-faint"}>
            {draft.length}/{MAX_LENGTH}
          </span>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-card border border-dashed border-line bg-surface px-6 py-12 text-center text-sm text-muted">
          No posts yet — be the first to share something.
        </div>
      ) : (
        <>
          {posts.slice(0, visible).map((post) => (
            <BigPostCard key={post.id} post={post} userId={userId} />
          ))}

          {visible < posts.length && (
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="w-full rounded-[10px] border border-line bg-surface py-3.5 text-[13.5px] text-charcoal transition-colors duration-200 hover:bg-paper-2"
            >
              Show more posts
            </button>
          )}
        </>
      )}
    </div>
  );
}
