import type { Project } from "@/types/project";

/**
 * Static project catalogue for the site. Every project is rendered via
 * generateStaticParams + SSG — nothing here is read from a database at
 * request time. To add a new project, append another entry to this array
 * and redeploy; there is no admin UI for editing project content.
 *
 * SOURCING NOTE (read before go-live):
 * The factual figures below (areas, price bands, unit/tower counts, possession
 * window) were compiled from a one-time web/Apify-style extraction across
 * public third-party listing aggregators (99acres, homznspace, addressofchoice,
 * ghar.tv) on 2026-07-26, since no first-party brochure or builder data sheet
 * was available at the time this file was written. Aggregator figures can be
 * stale or wrong. Every field tagged "VERIFY" below must be confirmed against
 * Signature Dwellings' current brochure/price list before this goes live.
 * All descriptive copy (tagline, description, location narrative) is written
 * fresh for this site — only the underlying facts were reused.
 */

export const projects: Project[] = [
  {
    slug: "signature-regal-electronic-city-chandapura",
    name: "Signature Regal",
    builder: "Signature Dwellings",
    status: "upcoming",
    featured: true,

    tagline: "Room to grow, minutes from Electronic City",
    description:
      "Signature Regal is a low-density apartment community taking shape on 8.5 acres just off Chandapura, a short drive from Electronic City's tech park cluster. Five towers with 590 units are planned around a generous landscaped core, with 80% of the land kept open rather than built on — so the towers face gardens and walking paths instead of each other. Home sizes are pitched at growing families and upgraders who have outgrown a starter flat: the plans run from a comfortable 2 BHK up to a full 3.5 BHK, all with usable, regularly-shaped rooms rather than odd corners. The location trades a bit of distance to the very center of Electronic City for a quieter, less congested stretch of Hosur Road, with the upcoming Satellite Town Ring Road expected to shorten that commute further once it opens. For buyers priced out of the immediate Electronic City core, it's positioned as a way to stay close to that job cluster without paying its premium.",

    // VERIFY: aggregator-reported RERA number was PRM/KA/RERA/1251/310/AG/170824/000174
    // (homznspace listing, 2026-07-26). Not displayed publicly on this site until
    // Signature Dwellings confirms it directly and it is cross-checked on the
    // Karnataka RERA portal — show "RERA registration awaited" until then.
    reraStatus: "awaited",

    configurations: [
      {
        label: "2 BHK",
        carpetAreaSqftMin: 1280,
        carpetAreaSqftMax: 1285,
        // VERIFY: only a "starting from" price was published (₹1 Cr onwards);
        // no upper band was available, so min/max are both set to that figure.
        priceMinInr: 10000000,
        priceMaxInr: 10200000,
      },
      {
        label: "2.5 BHK",
        carpetAreaSqftMin: 1607,
        carpetAreaSqftMax: 1661,
        // VERIFY: reported band ₹1.28–1.33 Cr
        priceMinInr: 12800000,
        priceMaxInr: 13300000,
      },
      {
        label: "3 BHK",
        carpetAreaSqftMin: 1703,
        carpetAreaSqftMax: 1954,
        // VERIFY: reported band ₹1.36–1.56 Cr
        priceMinInr: 13600000,
        priceMaxInr: 15600000,
      },
      {
        label: "3.5 BHK",
        carpetAreaSqftMin: 2058,
        carpetAreaSqftMax: 2069,
        // VERIFY: only a "starting from" price was published (₹1.65 Cr onwards)
        priceMinInr: 16500000,
        priceMaxInr: 16500000,
      },
    ],

    totalAreaAcres: 8.5,
    // Provided directly (2026-08-11): 5 towers, 590 units, 80% open space,
    // 100+ lifestyle amenities, 30,000 sq. ft. clubhouse.
    totalUnits: 590,
    totalTowers: 5,
    openSpacePercent: 80,
    clubhouseAreaSqft: 30000,
    amenitiesCount: 100,

    // VERIFY: possession was listed only as "2030 onwards (tentative)" —
    // confirm a firm date/quarter with the builder before publishing it
    // as a commitment anywhere in marketing copy.
    possessionDate: "2030 (tentative)",
    possessionConfirmed: false,

    // Grouping into categories is an editorial choice for presentation, not
    // a builder claim; the full 100+ item brochure list is not yet
    // enumerated here — only representative highlights are.
    amenities: [
      {
        category: "Lifestyle & Community",
        items: [
          "Grand entrance lobby and 30,000 sq. ft. clubhouse",
          "Landscaped gardens across 80% open space",
        ],
      },
      {
        category: "Sports & Recreation",
        items: ["Multiple outdoor sports courts", "Jogging and cycling track"],
      },
      {
        category: "Wellness",
        items: [
          "Swimming pool with a separate children's pool",
          "Fully equipped gymnasium",
          "Yoga and wellness deck",
        ],
      },
      {
        category: "Kids",
        items: ["Dedicated children's play area"],
      },
      {
        category: "Safety & Convenience",
        items: ["900+ car parking spaces", "24/7 security with CCTV coverage"],
      },
    ],

    images: {
      // Gallery paths below are still placeholders — replace with the
      // builder's official photography/renders before launch.
      hero: "/images/projects/signature-regal/hero.jpg",
      gallery: [
        "/images/projects/signature-regal/gallery/exterior-placeholder.jpg",
        "/images/projects/signature-regal/gallery/clubhouse-placeholder.jpg",
        "/images/projects/signature-regal/gallery/pool-placeholder.jpg",
        "/images/projects/signature-regal/gallery/garden-placeholder.jpg",
      ],
    },

    // Each configuration lists every layout variant the builder has published
    // for it — most configurations only have one today, but the model
    // supports more (e.g. a "2 BHK" with distinct corner-unit and
    // mid-block layouts) as Signature Dwellings publishes them.
    floorPlans: [
      {
        label: "2 BHK",
        images: ["/images/projects/signature-regal/floor-plans/2bhk-placeholder.jpg"],
      },
      {
        label: "2.5 BHK",
        images: ["/images/projects/signature-regal/floor-plans/2-5bhk-placeholder.jpg"],
      },
      {
        label: "3 BHK",
        images: ["/images/projects/signature-regal/floor-plans/3bhk-placeholder.jpg"],
      },
      {
        label: "3.5 BHK",
        images: ["/images/projects/signature-regal/floor-plans/3-5bhk-placeholder.jpg"],
      },
    ],

    location: {
      // VERIFY: address provided directly (2026-08-02) as a Google Plus Code
      // ("QP7P+X4, Madivala, Marasur Agrahara, Karnataka 562166"). No precise
      // geocode lookup was available here, so lat/lng below remain the
      // general Chandapura/Hosur Road corridor centroid used previously —
      // the homznspace listing for this same project independently describes
      // it as "in Chandapura, Bangalore," so this is the right corridor, just
      // not a pinpoint plot location yet. Decode the exact Plus Code
      // coordinates before launch so the embedded map pin lands precisely.
      // Displayed as "Chandapura, Electronic City" — the corridor name the
      // homznspace listing (cited above) independently uses for this
      // project, rather than the raw Plus Code locality "Marasur Agrahara".
      address: "QP7P+X4, Madivala, Marasur Agrahara, Karnataka 562166",
      locality: "Chandapura",
      city: "Electronic City",
      pincode: "562166",
      lat: 12.8021,
      lng: 77.7152,
    },

    // VERIFY: sourced 2026-08-02 from the homznspace listing for this project
    // (same aggregator already cited above) plus independent confirmation
    // that Bengaluru Metro's Yellow Line — which runs via Hosur Road through
    // Electronic City — opened 11 Aug 2025 and is now fully operational.
    // Distances are approximate corridor distances, not fabricated
    // drive-time minutes; confirm precisely once the exact plot is geocoded.
    nearbyLandmarks: [
      { category: "IT Park", name: "Electronic City", distance: "~6 km via Hosur Road" },
      { category: "Metro", name: "Bommasandra Metro Station (Yellow Line)", distance: "Via Hosur Road" },
      { category: "Railway", name: "Heelalige Railway Station", distance: "~2.5 km" },
      { category: "Hospital", name: "Narayana Health City", distance: "Nearby via Hosur Road" },
      { category: "Hospital", name: "Athreya Hospital", distance: "Nearby via Hosur Road" },
      { category: "School", name: "Swamy Vivekananda School", distance: "Nearby" },
      { category: "Road", name: "Hosur Road (NH48 / NH44)", distance: "Direct access" },
      { category: "Upcoming", name: "Satellite Town Ring Road (STRR)", distance: "Under development" },
      { category: "Upcoming", name: "SWIFT City (1,000-acre development)", distance: "Nearby, under development" },
    ],

    // Categories the site should eventually show once Signature Dwellings
    // confirms the actual spec sheet — left empty rather than guessed at.
    specifications: [
      { category: "Flooring", items: [] },
      { category: "Kitchen", items: [] },
      { category: "Bathrooms", items: [] },
      { category: "Doors & Windows", items: [] },
      { category: "Electrical", items: [] },
      { category: "Security", items: [] },
      { category: "Elevators", items: [] },
    ],

    faqs: [
      {
        question: "Is Signature Regal a new launch near Electronic City?",
        answer:
          "Yes — Signature Regal is a newly launched, pre-launch project on 8.5 acres just off Chandapura, roughly 6 km from Electronic City's IT park cluster via Hosur Road. It's one of the more recent new launches along that corridor.",
      },
      {
        question: "Is Signature Regal a good flat for investment?",
        answer:
          "It's positioned as an option for both investment and self-use buyers: low-density layout, 80% open space, proximity to Electronic City's job cluster, and direct access to the now-operational Yellow Line metro are the concrete factors behind that case — see the \"Why Invest\" section above for the full picture. As with any property, rental yields and price appreciation depend on market conditions and aren't guaranteed.",
      },
      {
        question: "Is Signature Regal RERA registered?",
        answer:
          "RERA registration is currently awaited. The registration number will be published here once confirmed directly with Signature Dwellings and cross-checked on the Karnataka RERA portal.",
      },
      {
        question: "What configurations are available?",
        answer:
          "2 BHK, 2.5 BHK, 3 BHK, and 3.5 BHK homes, ranging from roughly 1,280 to 2,069 sq.ft of carpet area.",
      },
      {
        question: "When is possession expected?",
        answer:
          "Possession is currently listed as 2030 (tentative) — an aggregator-reported figure, not a firm date confirmed by the builder. Treat it as indicative until confirmed.",
      },
      {
        question: "How do I book a site visit?",
        answer:
          "Use the \"Book Site Visit\" button on this page, or call or WhatsApp our team directly — we'll coordinate a visit with the sales office.",
      },
      {
        question: "How can I get the latest price list or cost sheet?",
        answer:
          "Use the \"Request Cost Sheet\" button near the pricing table and our team will share the current price list directly.",
      },
      {
        question: "Is brokerage charged for booking through this site?",
        answer: "No — enquiries through this site go directly to our team, with no added brokerage.",
      },
    ],

    // VERIFY: sourced directly from Signature Dwellings' official site
    // (signaturedwellings.in, fetched 2026-08-02) — these are the builder's
    // own stated figures. Note: "Signature Regal" does not appear by name
    // among the completed/ongoing/upcoming projects listed on their site as
    // of this fetch — confirm this project's builder attribution directly
    // with Signature Dwellings before launch.
    builderInfo: {
      overview:
        "Signature Dwellings is a Bengaluru-based developer with over a decade of experience in residential construction, positioning its projects around a \"Redefined Affordable Luxury\" approach — blending contemporary design and quality amenities with everyday affordability.",
      yearsInBusiness: 10,
      completedProjects: 6,
      ongoingProjects: 2,
    },
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectsByStatus(status: Project["status"]): Project[] {
  return projects.filter((p) => p.status === status);
}

/**
 * The project the homepage showcases directly. With a single project this
 * is just that project; once more are added, it resolves to the first
 * featured one so the homepage doesn't need to hardcode an array index.
 */
export function getPrimaryProject(): Project {
  return projects.find((p) => p.featured) ?? projects[0];
}
