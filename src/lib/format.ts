/** Formats a rupee amount (e.g. 10200000) as "₹1.02 Cr" or "₹85 L". */
export function formatInr(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2).replace(/\.?0+$/, "")} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2).replace(/\.?0+$/, "")} L`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatPriceRange(min: number, max: number): string {
  if (min === max) return `${formatInr(min)} onwards`;
  return `${formatInr(min)} – ${formatInr(max)}`;
}

export function formatSqftRange(min: number, max: number): string {
  if (min === max) return `${min.toLocaleString("en-IN")} sq.ft`;
  return `${min.toLocaleString("en-IN")} – ${max.toLocaleString("en-IN")} sq.ft`;
}

export function statusLabel(status: "ongoing" | "upcoming" | "completed"): string {
  return { ongoing: "Ongoing", upcoming: "Upcoming", completed: "Completed" }[status];
}

export function salesStageLabel(stage: "pre-launch" | "eoi-open" | "bookings-open"): string {
  return {
    "pre-launch": "Pre-Launch",
    "eoi-open": "EOI Open",
    "bookings-open": "Bookings Opening Soon",
  }[stage];
}
