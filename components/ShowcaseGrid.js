"use client";

import { useMemo, useState } from "react";
import PostCard from "./PostCard";
import { showcaseFilters } from "@/lib/mock-data";

const PAGE_SIZE = 6;

export default function ShowcaseGrid({ items, initialQuery = "" }) {
  const query = initialQuery.trim().toLowerCase();

  const [active, setActive] = useState(showcaseFilters[0]);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    return items.filter((post) => {
      const matchesCategory = active === "All" || post.category === active;
      const matchesQuery =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }, [items, active, query]);

  function selectFilter(filter) {
    setActive(filter);
    setVisible(PAGE_SIZE);
  }

  return (
    <>
      {query && (
        <p className="-mt-2.5 mb-5 text-[13px] text-muted">
          Showing results for <span className="font-semibold text-heading">&quot;{query}&quot;</span>
        </p>
      )}

      <div className="mb-7 flex flex-wrap gap-2.5">
        {showcaseFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => selectFilter(filter)}
            className={`rounded-full border px-4 py-2 text-[12.5px] transition-colors duration-200 ${
              active === filter
                ? "border-heading bg-ink text-white"
                : "border-line bg-surface text-charcoal hover:bg-paper-2"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-card border border-dashed border-line bg-surface px-6 py-12 text-center text-sm text-muted">
          No posts match {query ? `"${query}"` : "this filter"} yet.
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5 max-[880px]:grid-cols-1">
          {filtered.slice(0, visible).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {visible < filtered.length && (
        <button
          type="button"
          onClick={() => setVisible((v) => v + PAGE_SIZE)}
          className="mt-5 w-full rounded-[10px] border border-line bg-surface py-3.5 text-[13.5px] text-charcoal transition-colors duration-200 hover:bg-paper-2"
        >
          Show more posts
        </button>
      )}
    </>
  );
}
