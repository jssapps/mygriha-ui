"use client";

import { useState, type ReactNode } from "react";

export interface AccordionItem {
  key: string;
  title: string;
  content: ReactNode;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="divide-y divide-sand-100 rounded-lg border border-sand-100 bg-white">
      {items.map((item) => {
        const isOpen = openKey === item.key;
        return (
          <div key={item.key}>
            <button
              type="button"
              onClick={() => setOpenKey(isOpen ? null : item.key)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-sand-900 transition-colors hover:bg-sand-50"
              aria-expanded={isOpen}
            >
              {item.title}
              <span
                className={`shrink-0 text-lg leading-none text-sand-900/40 transition-transform ${isOpen ? "rotate-45" : ""}`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            {isOpen && <div className="px-5 pb-4 text-sm text-sand-900/70">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
