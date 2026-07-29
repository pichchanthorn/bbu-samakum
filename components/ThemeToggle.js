"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- required to avoid SSR/client theme mismatch
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  function toggle() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <div className="flex items-center gap-2.5 px-1 py-0.5">
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label="Toggle dark mode"
        onClick={toggle}
        className="relative h-[22px] w-10 shrink-0 rounded-full border border-line bg-paper-2 p-0"
      >
        <span
          className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-brass transition-transform duration-250 ease-out"
          style={{
            transform: isDark ? "translateX(18px)" : "translateX(0)",
            backgroundColor: isDark ? "var(--moss)" : "var(--brass)",
          }}
        />
      </button>
      <span className="text-[13px] text-charcoal">
        {isDark ? "Switch to Light" : "Switch to Dark"}
      </span>
    </div>
  );
}
