"use client";

import { useState } from "react";
import { showcaseFilters } from "@/lib/mock-data";

export default function ShowcaseFilters() {
  const [active, setActive] = useState(showcaseFilters[0]);

  return (
    <div className="mb-7 flex flex-wrap gap-2.5">
      {showcaseFilters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActive(filter)}
          className={`rounded-full border px-4 py-2 text-[12.5px] transition-colors duration-200 ${
            active === filter
              ? "border-heading bg-ink text-white"
              : "border-line bg-surface text-charcoal"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
