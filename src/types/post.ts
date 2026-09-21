export type BlogCategory =
  | "New Launches"
  | "Buying Guide"
  | "Bangalore Real Estate"
  | "Investment Tips"
  | "Area Guides";

export interface BlogPost {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  /** Paragraphs, rendered in order — no markdown/MDX dependency needed for this MVP. */
  content: string[];
  coverImage: string;
  /** ISO date (yyyy-mm-dd) */
  publishedAt: string;
  readingTimeMinutes: number;
  /** Set when a post discusses a specific featured project, to link directly to its brief. */
  relatedProjectSlug?: string;
}
