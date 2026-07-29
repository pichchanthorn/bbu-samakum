"use client";

import { useMemo, useState } from "react";
import MemberCard from "./MemberCard";
import { SearchIcon, ChevronDownIcon } from "./icons";

const TRACKS = ["All", "Student", "Lecturer"];
const YEARS = ["All", "Year 1", "Year 2", "Year 3", "Year 4"];

export default function MembersDirectory({ members }) {
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState("All");
  const [year, setYear] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return members.filter((member) => {
      const isLecturer = member.role.toLowerCase().includes("lecturer");
      const matchesQuery = !q || member.name.toLowerCase().includes(q);
      const matchesTrack =
        track === "All" || (track === "Lecturer" ? isLecturer : !isLecturer);
      const matchesYear = year === "All" || member.batch.includes(year);
      return matchesQuery && matchesTrack && matchesYear;
    });
  }, [members, query, track, year]);

  return (
    <>
      <div className="my-6 flex flex-wrap gap-3.5">
        <div className="flex max-w-[380px] flex-1 items-center gap-2.5 rounded-[10px] border border-line bg-surface px-4 py-2.5 text-faint focus-within:border-moss">
          <SearchIcon size={16} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search members by name..."
            aria-label="Search members by name"
            className="flex-1 bg-transparent text-sm text-charcoal outline-none placeholder:text-faint"
          />
        </div>

        <div className="relative">
          <select
            value={track}
            onChange={(e) => setTrack(e.target.value)}
            aria-label="Filter by track"
            className="cursor-pointer appearance-none rounded-[10px] border border-line bg-surface py-2.5 pr-9 pl-4 font-mono-sans text-[13px] text-charcoal outline-none focus:border-moss"
          >
            {TRACKS.map((t) => (
              <option key={t} value={t}>
                Track: {t}
              </option>
            ))}
          </select>
          <ChevronDownIcon
            size={14}
            className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-faint"
          />
        </div>

        <div className="relative">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            aria-label="Filter by year"
            className="cursor-pointer appearance-none rounded-[10px] border border-line bg-surface py-2.5 pr-9 pl-4 font-mono-sans text-[13px] text-charcoal outline-none focus:border-moss"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                Year: {y}
              </option>
            ))}
          </select>
          <ChevronDownIcon
            size={14}
            className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-faint"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-card border border-dashed border-line bg-surface px-6 py-12 text-center text-sm text-muted">
          No members match these filters.
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 max-[1080px]:grid-cols-3 max-[880px]:grid-cols-2 max-[560px]:grid-cols-1">
          {filtered.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </>
  );
}
