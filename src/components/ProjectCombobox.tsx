"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { formControlClasses } from "@/lib/ui";

export interface ProjectComboboxOption {
  slug: string;
  name: string;
}

interface ProjectComboboxProps {
  options: ProjectComboboxOption[];
  value: string;
  onChange: (slug: string) => void;
  placeholder?: string;
  invalid?: boolean;
}

/**
 * Searchable project picker: a text input that filters the project list as
 * you type, with a pop-down list below it. Keyboard: ↑/↓ to move, Enter to
 * pick, Esc to close. Follows the WAI-ARIA combobox (list autocomplete) pattern.
 */
export default function ProjectCombobox({
  options,
  value,
  onChange,
  placeholder = "Project name",
  invalid = false,
}: ProjectComboboxProps) {
  const listId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selected = options.find((o) => o.slug === value);

  const [query, setQuery] = useState(selected?.name ?? "");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    // Showing the full list when the box holds the current selection lets
    // people browse other projects without clearing the text first.
    if (!q || (selected && query === selected.name)) return options;
    return options.filter((o) => o.name.toLowerCase().includes(q));
  }, [options, query, selected]);

  // Close when clicking anywhere outside the control, restoring the text.
  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e: PointerEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setQuery(selected?.name ?? "");
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open, selected?.name]);

  function choose(option: ProjectComboboxOption) {
    onChange(option.slug);
    setQuery(option.name);
    setOpen(false);
  }

  function clear() {
    onChange("");
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) setOpen(true);
      setActiveIndex((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (open && filtered[activeIndex]) {
        e.preventDefault();
        choose(filtered[activeIndex]);
      }
    } else if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
        setQuery(selected?.name ?? "");
      }
    }
  }

  const activeId = open && filtered[activeIndex] ? `${listId}-opt-${activeIndex}` : undefined;

  return (
    <div ref={wrapperRef} className="relative">
      <input
        ref={inputRef}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={activeId}
        aria-label="Project name"
        aria-invalid={invalid}
        aria-required="true"
        autoComplete="off"
        placeholder={placeholder}
        value={query}
        onFocus={() => {
          setOpen(true);
          setActiveIndex(Math.max(filtered.findIndex((o) => o.slug === value), 0));
        }}
        onClick={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(0);
          setOpen(true);
          // Typing over a selection un-selects it until a new option is picked.
          if (value) onChange("");
        }}
        onKeyDown={handleKeyDown}
        className={`${formControlClasses} pr-16 ${invalid ? "!border-red-400 focus:!border-red-500 focus:!ring-red-500/20" : ""}`}
      />

      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center gap-1">
        {query && (
          <button
            type="button"
            onClick={clear}
            aria-label="Clear project"
            className="pointer-events-auto flex h-6 w-6 items-center justify-center rounded text-sand-900/40 hover:text-sand-900"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        )}
        <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" className="text-sand-900/50">
          <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Projects"
          className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md border border-sand-100 bg-white py-1 text-sm shadow-lg"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-sand-900/50">No projects match &ldquo;{query}&rdquo;</li>
          ) : (
            filtered.map((option, i) => (
              <li
                key={option.slug}
                id={`${listId}-opt-${i}`}
                role="option"
                aria-selected={option.slug === value}
                // pointerdown + preventDefault keeps focus in the input so the
                // outside-click handler doesn't fire before the pick registers.
                onPointerDown={(e) => {
                  e.preventDefault();
                  choose(option);
                }}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex cursor-pointer items-center justify-between px-3 py-2 ${
                  i === activeIndex ? "bg-sand-50" : ""
                } ${option.slug === value ? "font-semibold text-sky-700" : "text-sand-900"}`}
              >
                {option.name}
                {option.slug === value && (
                  <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M4 10l4 4 8-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
