"use client";

import { useEffect, useState } from "react";
import { HeartIcon } from "./icons";
import { createClient } from "@/lib/supabase/client";

// Shared by BigPostCard (feed) and PostCard (showcase) so the optimistic
// like/unlike logic exists in exactly one place. `userId` comes from the
// Server Component page (already fetched there for the auth-gated
// empty state), so this never needs its own auth.getUser() round trip
// before firing the mutation.
export default function LikeButton({ postId, initialLiked, initialCount, userId, size = 14 }) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(false), 4000);
    return () => clearTimeout(timer);
  }, [error]);

  async function handleClick() {
    if (pending) return;

    // Posts (and therefore this button) are only ever rendered for a
    // signed-in visitor in the first place — RLS makes `posts` invisible
    // to anon, same as `profiles` in Phase 3, so there's normally nothing
    // to click. This only guards the residual case of a session expiring
    // after the page already rendered.
    if (!userId) {
      setError(true);
      return;
    }

    const previousLiked = liked;
    const previousCount = count;
    const nextLiked = !liked;

    setLiked(nextLiked);
    setCount((c) => c + (nextLiked ? 1 : -1));
    setError(false);
    setPending(true);

    const supabase = createClient();
    const { error: mutationError } = nextLiked
      ? await supabase.from("likes").insert({ post_id: postId, user_id: userId })
      : await supabase.from("likes").delete().eq("post_id", postId).eq("user_id", userId);

    setPending(false);

    if (mutationError) {
      setLiked(previousLiked);
      setCount(previousCount);
      setError(true);
    }
  }

  return (
    <span className="inline-flex items-center gap-1.5">
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        aria-pressed={liked}
        aria-label={liked ? "Unlike this post" : "Like this post"}
        className={`inline-flex items-center gap-1.5 border-none bg-transparent p-0 ${
          pending ? "cursor-wait opacity-70" : "cursor-pointer"
        } ${liked ? "text-stamp" : ""}`}
      >
        <HeartIcon size={size} fill={liked ? "currentColor" : "none"} />
        {count}
      </button>
      {error && (
        <span role="status" className="text-[10px] text-stamp">
          Couldn&apos;t update
        </span>
      )}
    </span>
  );
}
