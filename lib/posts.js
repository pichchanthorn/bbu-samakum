import { createClient } from "@/lib/supabase/server";
import {
  displayName,
  displayInitials,
  authorMetaParts,
  formatRelativeTime,
  normalizeCover,
} from "@/lib/postDisplay";

// Fetches posts of the given type plus everything needed to render them —
// author display info, real like counts + whether currentUserId has liked
// each one, and real comment counts — in a fixed number of queries
// regardless of how many posts there are (no N+1). Returns { posts, error }
// so callers can render the same empty/error states Phase 3 established.
export async function getPostsWithEngagement({ type, currentUserId }) {
  const supabase = await createClient();

  const { data: rows, error: postsError } = await supabase
    .from("posts")
    .select("id, title, excerpt, cover, icon, category, tags, views, author_id, created_at")
    .eq("type", type)
    .order("created_at", { ascending: false });

  if (postsError) {
    console.error(`[${type}-posts] posts query failed:`, {
      message: postsError.message,
      code: postsError.code,
      details: postsError.details,
      hint: postsError.hint,
    });
    return { posts: [], error: postsError };
  }

  if (rows.length === 0) {
    return { posts: [], error: null };
  }

  const postIds = rows.map((r) => r.id);
  const authorIds = [...new Set(rows.map((r) => r.author_id))];

  const [profilesResult, likesResult, commentsResult] = await Promise.all([
    supabase.from("profiles").select("id, name, initials, role, batch").in("id", authorIds),
    supabase.from("likes").select("post_id, user_id").in("post_id", postIds),
    supabase.from("comments").select("post_id").in("post_id", postIds),
  ]);

  for (const [label, result] of [
    ["profiles", profilesResult],
    ["likes", likesResult],
    ["comments", commentsResult],
  ]) {
    if (result.error) {
      console.error(`[${type}-posts] ${label} query failed:`, {
        message: result.error.message,
        code: result.error.code,
        details: result.error.details,
        hint: result.error.hint,
      });
      return { posts: [], error: result.error };
    }
  }

  const profilesById = new Map((profilesResult.data ?? []).map((p) => [p.id, p]));

  const likeCounts = new Map();
  const likedByMe = new Set();
  for (const like of likesResult.data ?? []) {
    likeCounts.set(like.post_id, (likeCounts.get(like.post_id) ?? 0) + 1);
    if (currentUserId && like.user_id === currentUserId) {
      likedByMe.add(like.post_id);
    }
  }

  const commentCounts = new Map();
  for (const comment of commentsResult.data ?? []) {
    commentCounts.set(comment.post_id, (commentCounts.get(comment.post_id) ?? 0) + 1);
  }

  const posts = rows.map((row) => {
    const profile = profilesById.get(row.author_id);
    const { cover, icon } = normalizeCover(row);
    const time = formatRelativeTime(row.created_at);

    const shared = {
      id: row.id,
      authorInitials: displayInitials(profile?.initials),
      author: displayName(profile?.name),
      title: row.title,
      excerpt: row.excerpt ?? "",
      likes: likeCounts.get(row.id) ?? 0,
      liked: likedByMe.has(row.id),
      comments: commentCounts.get(row.id) ?? 0,
    };

    if (type === "feed") {
      return {
        ...shared,
        meta: `${authorMetaParts(profile)} · ${time}`,
        cover,
        icon,
        views: row.views ?? 0,
      };
    }

    return {
      ...shared,
      meta: authorMetaParts(profile),
      tags: row.tags ?? [],
      category: row.category ?? "",
      time,
    };
  });

  return { posts, error: null };
}
