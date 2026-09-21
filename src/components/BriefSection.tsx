import type { ReactNode } from "react";

/**
 * "Chapter" heading used across the homepage and project detail page — the
 * recurring editorial device that ties the varied section layouts together
 * without repeating any single layout. Every section shares the same
 * max-w-7xl container so nothing reads as narrower or wider than the rest
 * of the page — individual pieces of content (an intro paragraph, an FAQ
 * answer) constrain their own line length internally instead.
 */
export default function BriefSection({
  id,
  eyebrow,
  title,
  intro,
  tone = "default",
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  /** "muted" wraps the section in a soft full-bleed band to set it apart from plain sections around it. */
  tone?: "default" | "muted";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-[140px] py-10 sm:py-12 ${tone === "muted" ? "bg-sand-100/70" : ""}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-900/40">{eyebrow}</p>
          <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-sand-900 sm:text-3xl">{title}</h2>
          {intro && <p className="mt-3 max-w-2xl text-sand-900/70">{intro}</p>}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
