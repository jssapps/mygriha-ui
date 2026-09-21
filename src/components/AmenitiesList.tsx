import type { ReactNode } from "react";
import type { AmenityGroup } from "@/types/project";
import { cardClasses, iconBadgeClasses } from "@/lib/ui";

const ICON_PROPS = {
  width: 22,
  height: 22,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  "aria-hidden": true,
} as const;

const ICONS = {
  lobby: (
    <svg {...ICON_PROPS}>
      <path d="M4 17V8l6-4.5L16 8v9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 17v-5h5v5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 17h14" strokeLinecap="round" />
    </svg>
  ),
  garden: (
    <svg {...ICON_PROPS}>
      <path
        d="M10 3c2.5 1 4 3.2 4 6 0 3.5-4 8-4 8s-4-4.5-4-8c0-2.8 1.5-5 4-6Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 8v9" strokeLinecap="round" />
    </svg>
  ),
  sports: (
    <svg {...ICON_PROPS}>
      <circle cx="10" cy="10" r="6.5" />
      <path d="M5.3 5c2 2.2 2 7.8 0 10M14.7 5c-2 2.2-2 7.8 0 10" strokeLinecap="round" />
    </svg>
  ),
  track: (
    <svg {...ICON_PROPS}>
      <circle cx="5.2" cy="14" r="2.7" />
      <circle cx="14.8" cy="14" r="2.7" />
      <path
        d="M5.2 14l3.3-6.5h2.8L9.5 11M8.5 7.5h2.7M11.3 11l3.5 3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  pool: (
    <svg {...ICON_PROPS}>
      <path d="M3 8h14v6H3z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 16c1 1 2 1 3 0s2-1 3 0 2 1 3 0 2-1 3 0 2 1 3 0" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 8V5.5M14 8V5.5" strokeLinecap="round" />
    </svg>
  ),
  gym: (
    <svg {...ICON_PROPS}>
      <path d="M4 10h12" strokeLinecap="round" />
      <path d="M4 7v6M16 7v6" strokeLinecap="round" />
      <path d="M2 8.5v3M18 8.5v3" strokeLinecap="round" />
    </svg>
  ),
  yoga: (
    <svg {...ICON_PROPS}>
      <circle cx="10" cy="4.5" r="1.5" />
      <path
        d="M10 7v4l-4 5.5M10 11l4 5.5M6.5 12h7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  kids: (
    <svg {...ICON_PROPS}>
      <circle cx="7" cy="6" r="2" />
      <circle cx="13.5" cy="8" r="1.5" />
      <path
        d="M3.5 16c.5-3 1.8-5 3.5-5s3 2 3.5 5M11 16c.3-2.5 1.5-4.5 3-4.5s2.7 2 3 4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  parking: (
    <svg {...ICON_PROPS}>
      <rect x="3.5" y="3.5" width="13" height="13" rx="2" />
      <path d="M8 14V6h2.5a2.5 2.5 0 0 1 0 5H8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  security: (
    <svg {...ICON_PROPS}>
      <path
        d="M10 3.5 16 6v4.5c0 4-2.7 6-6 6.5-3.3-.5-6-2.5-6-6.5V6l6-2.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7.5 10l1.7 1.7L12.5 8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  sparkle: (
    <svg {...ICON_PROPS}>
      <path
        d="M10 3v3M10 14v3M3 10h3M14 10h3M5.5 5.5l2 2M12.5 12.5l2 2M14.5 5.5l-2 2M7.5 12.5l-2 2"
        strokeLinecap="round"
      />
    </svg>
  ),
} as const;

type IconKey = keyof typeof ICONS;

interface AmenityCardContent {
  title: string;
  description?: string;
  icon: IconKey;
}

/**
 * Presentation layer only — every title/description below is a direct
 * reformatting of the exact source strings in src/data/projects.ts, not a
 * new claim. Anything not in this map (e.g. a future project's amenities)
 * falls back to the raw source text with a generic icon, so nothing breaks.
 */
const PRESENTATION: Record<string, AmenityCardContent> = {
  "Grand entrance lobby and 30,000 sq. ft. clubhouse": {
    title: "Grand Entrance & Clubhouse",
    description: "30,000 sq. ft. clubhouse",
    icon: "lobby",
  },
  "Landscaped gardens across 80% open space": {
    title: "Landscaped Gardens",
    description: "Across 80% open space",
    icon: "garden",
  },
  "Multiple outdoor sports courts": {
    title: "Sports Courts",
    description: "Multiple outdoor courts",
    icon: "sports",
  },
  "Jogging and cycling track": {
    title: "Jogging & Cycling Track",
    icon: "track",
  },
  "Swimming pool with a separate children's pool": {
    title: "Swimming Pool",
    description: "With a separate children's pool",
    icon: "pool",
  },
  "Fully equipped gymnasium": {
    title: "Gymnasium",
    description: "Fully equipped",
    icon: "gym",
  },
  "Yoga and wellness deck": {
    title: "Yoga & Wellness Deck",
    icon: "yoga",
  },
  "Dedicated children's play area": {
    title: "Children's Play Area",
    description: "Dedicated space for kids",
    icon: "kids",
  },
  "900+ car parking spaces": {
    title: "Ample Parking",
    description: "900+ car parking spaces",
    icon: "parking",
  },
  "24/7 security with CCTV coverage": {
    title: "24/7 Security",
    description: "CCTV coverage across the property",
    icon: "security",
  },
};

function presentationFor(item: string): AmenityCardContent {
  return PRESENTATION[item] ?? { title: item, icon: "sparkle" };
}

export default function AmenitiesList({ amenities }: { amenities: AmenityGroup[] }) {
  const cards = amenities.flatMap((group) => group.items.map((item) => presentationFor(item)));

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
      {cards.map((card) => (
        <AmenityCard key={card.title} {...card} />
      ))}
    </div>
  );
}

function AmenityCard({
  title,
  description,
  icon,
}: {
  title: string;
  description?: string;
  icon: IconKey;
}): ReactNode {
  return (
    <div className={`group flex h-full flex-col p-5 ${cardClasses}`}>
      <span className={iconBadgeClasses}>{ICONS[icon]}</span>
      <p className="mt-4 text-sm font-semibold text-sand-900">{title}</p>
      {description && <p className="mt-1 text-xs leading-relaxed text-sand-900/60">{description}</p>}
    </div>
  );
}
