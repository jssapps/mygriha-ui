/**
 * Shared class recipes for the two things every screen has multiple of:
 * buttons (mixed <Link>/<button> call sites, so a plain string beats a
 * polymorphic component) and form controls.
 */

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-150 disabled:opacity-60 disabled:pointer-events-none";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-sky-700 text-white hover:bg-sky-800",
  secondary: "border border-sand-100 text-sand-900 hover:border-sky-700 hover:text-sky-700",
  ghost: "text-sand-900/70 hover:text-sky-700",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md") {
  return `${BASE} ${VARIANTS[variant]} ${SIZES[size]}`;
}

export const formControlClasses =
  "w-full rounded-md border border-sand-100 bg-white px-3 py-2.5 text-sm text-sand-900 outline-none transition-colors placeholder:text-sand-900/40 focus:border-sky-600 focus:ring-1 focus:ring-sky-600/20";

/**
 * The one card recipe used everywhere a section shows a bordered white
 * panel (highlights, amenities, reasons, builder profile, construction
 * progress, contact cards) — same radius, border, and hover lift throughout
 * so no section reads as "designed separately" from the others.
 */
export const cardClasses = "rounded-lg border border-sand-100 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-700/30 hover:shadow-md";

/** Icon badge used inside cards — same size/colors everywhere, inverts on card hover via the `group` on the parent card. */
export const iconBadgeClasses =
  "flex h-11 w-11 items-center justify-center rounded-md bg-sand-50 text-sky-700 transition-colors group-hover:bg-sky-700 group-hover:text-white";
