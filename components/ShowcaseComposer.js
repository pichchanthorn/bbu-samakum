"use client";

import { useState } from "react";

// Fixed category set. showcaseFilters in lib/mock-data.js matches these
// exact values so filtering works for real posts.
const CATEGORIES = ["Web", "Mobile", "Design", "Data", "Other"];
const TITLE_MAX = 100;
const DESCRIPTION_MAX = 1000;

export default function ShowcaseComposer({ onSubmit, pending, error }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();
  const canSubmit = trimmedTitle.length > 0 && trimmedDescription.length > 0 && !pending;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    const ok = await onSubmit({
      title: trimmedTitle,
      description: trimmedDescription,
      category,
    });

    if (ok) {
      setTitle("");
      setDescription("");
      setCategory(CATEGORIES[0]);
      setOpen(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mb-7 w-full rounded-[10px] border border-dashed border-line bg-surface py-3.5 text-center text-[13.5px] font-semibold text-charcoal transition-colors duration-200 hover:bg-paper-2"
      >
        + New Showcase Post
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-7 flex flex-col gap-3.5 rounded-card border border-line bg-surface p-5"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-bold tracking-[-0.005em] text-heading">New Showcase Post</h3>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-[12.5px] font-semibold text-moss hover:underline"
        >
          Cancel
        </button>
      </div>

      <div>
        <label htmlFor="showcase-title" className="mb-1.5 block text-xs font-semibold text-heading">
          Title
        </label>
        <input
          id="showcase-title"
          type="text"
          value={title}
          maxLength={TITLE_MAX}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Campus Bus Tracker"
          className="w-full rounded-[10px] border border-line bg-paper px-3.5 py-2.5 text-[13.5px] text-charcoal outline-none placeholder:text-faint focus:border-moss"
        />
      </div>

      <div>
        <label htmlFor="showcase-description" className="mb-1.5 block text-xs font-semibold text-heading">
          Description
        </label>
        <textarea
          id="showcase-description"
          rows={4}
          value={description}
          maxLength={DESCRIPTION_MAX}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What did you build, and what should people know about it?"
          className="w-full resize-y rounded-[10px] border border-line bg-paper px-3.5 py-2.5 text-[13.5px] text-charcoal outline-none placeholder:text-faint focus:border-moss"
        />
        <div className="mt-1 text-right text-[10.5px] text-faint">
          {description.length}/{DESCRIPTION_MAX}
        </div>
      </div>

      <div>
        <label htmlFor="showcase-category" className="mb-1.5 block text-xs font-semibold text-heading">
          Category
        </label>
        <select
          id="showcase-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full cursor-pointer rounded-[10px] border border-line bg-paper px-3.5 py-2.5 text-[13.5px] text-charcoal outline-none focus:border-moss"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p role="status" className="text-[11.5px] text-stamp">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-0.5 w-full rounded-full border border-ink bg-ink py-2.5 text-center text-sm font-semibold text-white transition-[transform,background,opacity] duration-150 hover:-translate-y-px hover:bg-moss disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 disabled:hover:bg-ink"
      >
        {pending ? "Posting..." : "Post to Showcase"}
      </button>
    </form>
  );
}
