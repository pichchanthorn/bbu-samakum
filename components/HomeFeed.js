"use client";

import { useState } from "react";
import BigPostCard from "./BigPostCard";
import { idCardMember } from "@/lib/mock-data";

const PAGE_SIZE = 3;
const COVERS = ["cover-a", "cover-b", "cover-c"];

export default function HomeFeed({ initialPosts, userId }) {
  const [posts, setPosts] = useState(initialPosts);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [draft, setDraft] = useState("");

  function handlePost() {
    const text = draft.trim();
    if (!text) return;
    setPosts((prev) => [
      {
        id: `feed-local-${prev.length}-${text.slice(0, 8)}`,
        authorInitials: idCardMember.initials,
        author: idCardMember.name,
        meta: `${idCardMember.department} · Just now`,
        cover: COVERS[prev.length % COVERS.length],
        title: text.length > 70 ? `${text.slice(0, 70)}…` : text,
        excerpt: text,
        likes: 0,
        comments: 0,
        views: 1,
      },
      ...prev,
    ]);
    setVisible((v) => v + 1);
    setDraft("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handlePost();
    }
  }

  return (
    <div className="flex flex-col gap-[18px]">
      <div className="mb-5 flex items-center gap-3 rounded-card border border-line bg-surface px-4 py-3.5">
        <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-moss text-xs font-bold text-white">
          {idCardMember.initials}
        </div>
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Share something with the IT Department..."
          aria-label="Share something with the IT Department"
          className="flex-1 rounded-full border border-line bg-paper px-4 py-2.5 text-[13.5px] text-charcoal outline-none placeholder:text-faint focus:border-moss"
        />
        <button
          type="button"
          onClick={handlePost}
          disabled={!draft.trim()}
          className="shrink-0 rounded-full border border-ink bg-ink px-[18px] py-2.5 text-center text-[13px] font-semibold text-white transition-[transform,background,opacity] duration-150 hover:-translate-y-px hover:bg-moss disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 disabled:hover:bg-ink"
        >
          Post
        </button>
      </div>

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
    </div>
  );
}
