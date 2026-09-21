"use client";

import { useEffect, useState } from "react";

export interface SectionNavItem {
  id: string;
  label: string;
  /** Set false to keep the link out of scroll-spy tracking (e.g. a sticky
   * element that stays pinned in view and would otherwise look "active"
   * for the entire remaining scroll). It still works as a jump link. */
  spy?: boolean;
}

const ACTIVE_LINE_OFFSET = 140; // roughly header + nav height

/**
 * Sticky in-page quick-nav for the single-project homepage. Highlights
 * whichever section is currently in view — a functional wayfinding aid
 * (this page is long), not decoration.
 */
export default function SectionNav({ items }: { items: SectionNavItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const spiedItems = items.filter((item) => item.spy !== false);

    function updateActive() {
      let current = spiedItems[0]?.id;
      for (const item of spiedItems) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top - ACTIVE_LINE_OFFSET <= 0) {
          current = item.id;
        }
      }
      if (current) setActiveId(current);
    }

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [items]);

  return (
    <nav
      aria-label="Page sections"
      className="sticky top-[68px] z-30 hidden border-b border-sand-100 bg-sand-50 lg:block"
    >
      <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block whitespace-nowrap border-b-2 px-3 py-3 text-xs font-semibold uppercase tracking-wide transition-colors ${
                activeId === item.id
                  ? "border-sky-700 text-sky-700"
                  : "border-transparent text-sand-900/50 hover:text-sky-700"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
