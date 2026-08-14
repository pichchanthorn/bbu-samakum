// Pure, framework-agnostic formatting helpers shared between the
// server-only post fetch (lib/posts.js) and the client-side composers
// (Feed/Showcase), so a just-created post can be displayed identically to
// one that came back from a real page load, without a second round trip.
// No next/headers or other server-only imports here — this file has to be
// safely importable from a "use client" component.

export const COVERS = ["cover-a", "cover-b", "cover-c"];
export const ICONS = ["arrows", "laptop", "grid"];

// Same fallback convention Phase 3 established for the Members page (New
// member / "?" / "—").
export function displayName(name) {
  return name?.trim() || "New member";
}

export function displayInitials(initials) {
  return initials?.trim() || "?";
}

// Only one department is active right now (see the same reasoning in
// app/members/page.js), so students always show "IT" and lecturers always
// show "Lecturer • IT Department" — matching the exact abbreviations the
// old mock feedPosts/showcaseItems meta strings used.
export function authorMetaParts(profile) {
  if (profile?.role === "lecturer") {
    return "Lecturer • IT Department";
  }
  const batch = profile?.batch?.trim() || "—";
  return `IT • ${batch}`;
}

export function formatRelativeTime(dateString) {
  const diffMs = Math.max(0, Date.now() - new Date(dateString).getTime());
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

// posts.cover/icon are freeform text columns — normalize to a value
// BigPostCard's coverIcons/coverBg maps actually have an entry for, since
// rendering an unmapped key would try to render `undefined` as a component.
export function normalizeCover(row) {
  const cover = COVERS.includes(row.cover) ? row.cover : COVERS[0];
  const icon = ICONS.includes(row.icon) ? row.icon : ICONS[0];
  return { cover, icon };
}
