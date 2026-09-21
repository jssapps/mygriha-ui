import type { BlogCategory, BlogPost } from "@/types/post";
import { SITE_NAME } from "@/lib/constants";

/**
 * Static post catalogue, mirroring src/data/projects.ts — no CMS/MDX
 * dependency for this MVP. Content here is original editorial writing, not
 * a source of new factual claims about any project: anything referencing
 * Signature Regal reuses only the already-VERIFY-tagged facts in
 * src/data/projects.ts rather than introducing new figures.
 */
export const BLOG_CATEGORIES: BlogCategory[] = [
  "New Launches",
  "Buying Guide",
  "Bangalore Real Estate",
  "Investment Tips",
  "Area Guides",
];

export const posts: BlogPost[] = [
  {
    slug: "inside-signature-regal-what-we-know-so-far",
    title: "Inside Signature Regal: What We Know So Far",
    category: "New Launches",
    excerpt:
      "A first look at Signature Regal's low-density layout on the Electronic City–Chandapura corridor — and the details still pending builder confirmation.",
    coverImage: "/images/projects/signature-regal/hero.jpg",
    publishedAt: "2026-07-28",
    readingTimeMinutes: 4,
    relatedProjectSlug: "signature-regal-electronic-city-chandapura",
    content: [
      `Signature Regal is the first project we've brought onto ${SITE_NAME}'s roster, and it's a useful example of how we evaluate a newly launched project before recommending it to a client.`,
      "The headline numbers are straightforward: five towers across 8.5 acres, with 80% of the land kept as open ground rather than built footprint. Configurations run from 2 BHK through 3.5 BHK, which puts it squarely in the \"upgrader\" bracket — buyers moving out of a starter flat rather than buying their first home.",
      "What we haven't confirmed yet matters just as much as what we have. RERA registration is currently listed as awaited, the possession date is tentative, and the full specification sheet — flooring, fittings, elevators — hasn't been published by the builder. We show all of this as \"pending\" rather than guessing, and we'll update the project page the moment each detail is confirmed directly with Signature Dwellings.",
      "The location case rests on the Hosur Road corridor: a short drive to Electronic City's IT cluster, direct access to the now-operational Yellow Line metro, and the upcoming Satellite Town Ring Road, which should shorten that commute further once it's built.",
      "If this configuration and corridor match what you're looking for, the full project brief — pricing by unit type, floor plans, amenities, and location detail — is on the project page linked below.",
    ],
  },
  {
    slug: "first-time-buyer-checklist-bangalore-apartments",
    title: "A First-Time Buyer's Checklist Before You Book an Apartment in Bangalore",
    category: "Buying Guide",
    excerpt:
      "The line items worth checking before you pay a booking amount — from RERA status to what's actually included in the cost sheet.",
    coverImage: "/images/hero-placeholder.jpg",
    publishedAt: "2026-07-20",
    readingTimeMinutes: 6,
    content: [
      "Booking an apartment is usually the largest single payment most people make in a given year, and the process rewards a bit of deliberate slowness. A short checklist, worked through before you pay a booking amount, catches most of the common regrets.",
      "Start with RERA. Every project legally on sale in Karnataka should carry a Karnataka RERA registration number, checkable independently on the state RERA portal. If a builder can't produce one, or the project is still \"awaiting registration,\" that's not automatically disqualifying for an early-stage launch — but it changes how much you should rely on any possession date you're quoted.",
      "Next, separate carpet area from super built-up area. The price per square foot quoted to you is almost always against the larger, super built-up figure — carpet area (the space you actually walk on) is typically 20–30% smaller. Ask for both numbers before comparing price across two projects.",
      "Ask for the cost sheet, not just the headline price. A realistic cost sheet itemizes the base price, floor rise charges, car parking, club membership, maintenance deposit, and applicable GST and registration costs separately. The gap between a \"starting from\" number and the actual all-in cost is where most surprises live.",
      "Confirm the possession date's status: is it builder-confirmed in the agreement, or an informal estimate? RERA filings list a legally binding possession date — that's the number worth anchoring to, not a verbal timeline from a sales office.",
      "Finally, do the site visit in person before booking, even for an under-construction project. Seeing the actual plot, its access roads, and the surrounding development tells you things no brochure will.",
    ],
  },
  {
    slug: "why-bangalore-it-corridors-shape-real-estate",
    title: "Why Bangalore's IT Corridors Keep Shaping Its Real Estate Map",
    category: "Bangalore Real Estate",
    excerpt:
      "From Whitefield to Electronic City, Bangalore's residential growth has tended to follow its tech clusters — here's why that pattern holds.",
    coverImage: "/images/about-hero-placeholder.jpg",
    publishedAt: "2026-07-10",
    readingTimeMinutes: 5,
    content: [
      "Bangalore's residential market doesn't expand evenly outward from the city centre the way older Indian cities often have. Instead, growth tends to cluster around its major IT employment hubs — Whitefield, the Outer Ring Road stretch through Marathahalli and Sarjapur, and the Electronic City–Hosur Road corridor in the south.",
      "The logic is straightforward: a large share of Bangalore's workforce is employed in IT and IT-enabled services, and commute time to a job cluster remains one of the strongest predictors of where that workforce is willing to live. Corridors with a functioning IT park nearby tend to sustain steadier demand than areas without one, even when the broader market cools.",
      "Infrastructure investment tends to follow the same pattern rather than lead it — metro lines, ring roads, and flyovers are typically built to relieve congestion in corridors that are already dense with commuters, which is part of why a corridor's infrastructure pipeline is worth watching, not just its current connectivity.",
      "None of this guarantees any individual project's outcome — construction quality, builder track record, and a project's specific plot still matter enormously. But understanding which corridor a project sits in, and why that corridor exists as a residential cluster in the first place, is a useful first filter before evaluating anything else.",
    ],
  },
  {
    slug: "self-use-vs-investment-choosing-the-right-apartment",
    title: "Self-Use vs. Investment: How the Right Apartment Changes With Your Purpose",
    category: "Investment Tips",
    excerpt:
      "The configuration, corridor, and timeline that make sense for a home you'll live in can look quite different from what makes sense for a purely rental play.",
    coverImage: "/images/projects/signature-regal/gallery/garden-placeholder.jpg",
    publishedAt: "2026-06-28",
    readingTimeMinutes: 5,
    content: [
      "One of the first questions we ask every buyer is simple: is this for you to live in, or is this primarily an investment? The answer changes which projects actually make sense to shortlist.",
      "For self-use, proximity to your own workplace, school options for your family, and the finished feel of common areas tend to weigh more heavily than they should for a pure investment. A slightly longer possession timeline is more tolerable if you're planning years ahead; a larger, less liquid configuration (a 3.5 BHK, say) is a reasonable trade-off if you intend to stay for a decade.",
      "For investment, liquidity and rentability usually matter more than personal fit. Smaller, more standard configurations (2 BHK, 2.5 BHK) tend to have a deeper resale and rental pool than larger or unusual layouts. Corridor-level demand — is this an area with a large working population that actually needs rental housing nearby — matters more than any single amenity.",
      "We deliberately don't publish rental-yield or price-appreciation projections on this site. Those numbers depend on market conditions that neither we nor any builder can guarantee, and a specific percentage promised in marketing material is a claim worth being skeptical of. What we can do is document a project's verified facts clearly enough that you can make that judgment against your own purpose.",
      "Whichever category you're in, it's worth stating your purpose to whoever you're speaking with at the builder or advisory stage — it changes which questions are worth asking.",
    ],
  },
  {
    slug: "electronic-city-chandapura-locality-guide",
    title: "Electronic City to Chandapura: A Locality Guide for Homebuyers",
    category: "Area Guides",
    excerpt:
      "What the Hosur Road stretch between Electronic City and Chandapura actually offers today, and what's still under construction.",
    coverImage: "/images/projects/signature-regal/gallery/exterior-placeholder.jpg",
    publishedAt: "2026-06-15",
    readingTimeMinutes: 5,
    content: [
      "The stretch of Hosur Road running from Electronic City through to Chandapura has become one of the more closely watched residential corridors in South Bangalore, largely on the strength of its connectivity to Electronic City's IT park cluster.",
      "Connectivity today: the Bengaluru Metro Yellow Line, running via Hosur Road through Electronic City, became fully operational in August 2025 — one of the few IT-corridor stretches in the city with a completed metro link rather than a promised one. Hosur Road itself (NH48/NH44) gives direct road access along the corridor.",
      "What's coming: the Satellite Town Ring Road is under development and is expected to add road capacity and shorten cross-corridor commutes once it opens. The corridor also sits near the planned 1,000-acre SWIFT City development, a large-scale project that — if it proceeds on its stated scale — would likely bring further jobs and residential demand to the belt over time.",
      "Social infrastructure along the corridor includes hospitals such as Narayana Health City, and a mix of schools serving the residential population that's grown alongside Electronic City's expansion; the density of options tends to increase closer to Electronic City itself and thins out further along Hosur Road toward Chandapura.",
      "The trade-off buyers along this corridor are typically making is distance from the absolute core of Electronic City in exchange for lower density and lower prices than that core commands — a reasonable trade for buyers who don't need to be at the immediate centre of the job cluster.",
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}
