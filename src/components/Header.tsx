"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AUTHORIZED_CHANNEL_PARTNER_LABEL, CONTACT_PHONE_DISPLAY, SITE_NAME } from "@/lib/constants";
import { buttonClasses } from "@/lib/ui";
import { getPrimaryProject, getProjectBySlug } from "@/data/projects";
import CallNowButton from "./CallNowButton";
import OpenLeadPopupButton from "./OpenLeadPopupButton";

const NAV_LINKS = [
  { href: "/projects", label: "Featured Projects" },
  { href: "/blog", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SCROLL_THRESHOLD = 24;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Pages that open with a full-bleed hero photo directly under the header —
  // home and every project detail page.
  const isHeroPage = pathname === "/" || pathname.startsWith("/projects/");
  const transparent = isHeroPage && !scrolled;

  // Brand block shows the project's own name + channel-partner label only on
  // that project's page (home, since it renders the primary project, and its
  // /projects/[slug] page). Every other route (listing, blog, about, contact)
  // shows the site brand instead, since no single project is "open" there.
  const projectSlugMatch = pathname.match(/^\/projects\/([^/]+)/);
  const project =
    isHeroPage && ((projectSlugMatch && getProjectBySlug(projectSlugMatch[1])) || getPrimaryProject());

  useEffect(() => {
    if (!isHeroPage) return;
    function updateScrolled() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, [isHeroPage]);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        transparent ? "bg-transparent" : "bg-sand-50"
      } ${isHeroPage ? "-mb-[84px]" : ""}`}
    >
      {transparent && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-transparent" />
      )}
      <div className={`relative ${transparent ? "" : "border-b border-sand-100"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" aria-label={`${SITE_NAME} home`} className="flex min-w-0 items-center gap-3">
            {/* Brand logo — full lockup on sm+, symbol only on small screens when
                a project name sits beside it. Reverse (light) artwork over the
                transparent hero header, regular artwork on the solid header. */}
            <span className={`relative shrink-0 ${project ? "h-[60px] w-14 sm:w-[186px]" : "h-[60px] w-[186px]"}`}>
              <Image
                src={transparent ? "/brand/mygriha-logo-reverse.svg" : "/brand/mygriha-logo.svg"}
                alt={SITE_NAME}
                width={186}
                height={60}
                priority
                className={`h-[60px] w-auto ${project ? "hidden sm:block" : ""} ${
                  transparent ? "[filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.5))]" : ""
                }`}
              />
              {project && (
                <Image
                  src={transparent ? "/brand/mygriha-mark-reverse.svg" : "/brand/mygriha-mark.svg"}
                  alt=""
                  width={56}
                  height={56}
                  priority
                  className={`h-14 w-14 sm:hidden ${
                    transparent ? "[filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.5))]" : ""
                  }`}
                />
              )}
            </span>
            {project && (
              <span
                className={`flex min-w-0 flex-col border-l pl-3 leading-tight ${
                  transparent ? "border-white/40" : "border-sand-100"
                }`}
              >
                <span
                  className={`truncate font-display text-lg font-bold tracking-tight transition-colors sm:text-xl ${
                    transparent ? "text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]" : "text-sky-700"
                  }`}
                >
                  {project.name}
                </span>
                <span
                  className={`text-[9px] font-medium uppercase tracking-wide transition-colors ${
                    transparent ? "text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]" : "text-sand-900/50"
                  }`}
                >
                  {AUTHORIZED_CHANNEL_PARTNER_LABEL}
                </span>
              </span>
            )}
          </Link>

          <nav className="hidden gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  transparent
                    ? "text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)] hover:text-earth-400"
                    : "text-sand-900/70 hover:text-sky-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <OpenLeadPopupButton className={`hidden lg:inline-flex ${buttonClasses("primary", "sm")}`}>
            Enquire Now
          </OpenLeadPopupButton>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`flex h-9 w-9 items-center justify-center rounded-md border transition-colors lg:hidden ${
              transparent ? "border-white/50 text-white" : "border-sand-100 text-sand-900"
            }`}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="sr-only">Menu</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M3 5h14M3 10h14M3 15h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {open && (
          <nav className="border-t border-sand-100 bg-sand-50 px-4 pb-4 lg:hidden">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-medium text-sand-900/70"
              >
                {link.label}
              </Link>
            ))}
            <CallNowButton className="block py-2 text-sm font-medium text-sand-900/70">
              Call {CONTACT_PHONE_DISPLAY}
            </CallNowButton>
            <OpenLeadPopupButton className={`mt-2 block w-full text-center ${buttonClasses("primary", "sm")}`}>
              Enquire Now
            </OpenLeadPopupButton>
          </nav>
        )}
      </div>
    </header>
  );
}
