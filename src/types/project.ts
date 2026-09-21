export type ProjectStatus = "ongoing" | "upcoming" | "completed";

/** The three commercial sales stages shown as a badge row instead of the
 * generic construction status, since "Upcoming" alone doesn't tell a buyer
 * what action is actually available (EOI vs. a formal booking). */
export type SalesStage = "pre-launch" | "eoi-open" | "bookings-open";

export type ReraStatus = "registered" | "awaited";

export interface ProjectConfiguration {
  /** e.g. "2 BHK", "2.5 BHK", "3 BHK", "3.5 BHK" */
  label: string;
  carpetAreaSqftMin: number;
  carpetAreaSqftMax: number;
  priceMinInr: number;
  priceMaxInr: number;
}

export interface FloorPlan {
  label: string;
  /** One or more layout variants for this configuration (e.g. different unit
   * orientations within the same "2 BHK") — always at least one image. */
  images: string[];
}

export interface ProjectImages {
  hero: string;
  gallery: string[];
}

export interface ProjectLocation {
  address: string;
  locality: string;
  city: string;
  pincode: string;
  lat: number;
  lng: number;
}

export interface AmenityGroup {
  category: string;
  items: string[];
}

export type LandmarkCategory =
  | "IT Park"
  | "Metro"
  | "Railway"
  | "Hospital"
  | "School"
  | "Road"
  | "Upcoming";

export interface NearbyLandmark {
  category: LandmarkCategory;
  name: string;
  /** Human-readable distance, e.g. "6 km" — never a fabricated drive-time minute figure. */
  distance: string;
}

export interface SpecificationGroup {
  category: string;
  /** Empty until confirmed with the builder — components render a "pending" state, not an invented spec. */
  items: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BuilderInfo {
  overview?: string;
  yearsInBusiness?: number;
  completedProjects?: number;
  ongoingProjects?: number;
  awards?: string[];
}

export interface ConstructionUpdate {
  percentComplete?: number;
  milestones?: string[];
  lastUpdated?: string;
}

export interface Project {
  slug: string;
  name: string;
  builder: string;
  status: ProjectStatus;
  tagline: string;
  description: string;
  reraStatus: ReraStatus;
  /** Only populate once confirmed directly with the builder; leave undefined while reraStatus is "awaited". */
  reraId?: string;
  configurations: ProjectConfiguration[];
  totalAreaAcres: number;
  totalUnits: number;
  totalTowers: number;
  /** Undefined unless a specific open-space percentage has been confirmed — components skip the pull-stat rather than guessing. */
  openSpacePercent?: number;
  /** Undefined unless a specific clubhouse size has been confirmed — components skip the pull-stat rather than guessing. */
  clubhouseAreaSqft?: number;
  /** Undefined unless a specific amenities count has been confirmed — components skip the pull-stat rather than guessing. */
  amenitiesCount?: number;
  possessionDate: string;
  possessionConfirmed: boolean;
  amenities: AmenityGroup[];
  images: ProjectImages;
  floorPlans: FloorPlan[];
  location: ProjectLocation;
  nearbyLandmarks: NearbyLandmark[];
  specifications: SpecificationGroup[];
  faqs: FaqItem[];
  /** Undefined until real builder credentials are confirmed — components show a "pending" state. */
  builderInfo?: BuilderInfo;
  /** Undefined for pre-construction projects — components skip rendering the section entirely. */
  constructionUpdate?: ConstructionUpdate;
  featured: boolean;
}
