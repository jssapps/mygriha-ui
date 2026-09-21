import type { FaqItem, Project } from "@/types/project";
import type { BlogPost } from "@/types/post";
import { CONTACT_EMAIL, CONTACT_PHONE_TEL, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export function buildRealEstateJsonLd(project: Project, path: string) {
  const prices = project.configurations.map((c) => c.priceMinInr);
  const maxPrices = project.configurations.map((c) => c.priceMaxInr);

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: project.name,
    description: project.description,
    url: `${SITE_URL}${path}`,
    image: [project.images.hero, ...project.images.gallery].map((src) => `${SITE_URL}${src}`),
    address: {
      "@type": "PostalAddress",
      streetAddress: project.location.address,
      addressLocality: project.location.locality,
      addressRegion: "Karnataka",
      postalCode: project.location.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: project.location.lat,
      longitude: project.location.lng,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...maxPrices),
      availability: "https://schema.org/PreOrder",
    },
    ...(project.reraStatus === "registered" && project.reraId
      ? { identifier: project.reraId }
      : {}),
  };
}

export function buildFaqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildArticleJsonLd(post: BlogPost, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [`${SITE_URL}${post.coverImage}`],
    datePublished: post.publishedAt,
    url: `${SITE_URL}${path}`,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/**
 * Organization + LocalBusiness (RealEstateAgent) markup for the advisory
 * itself — distinct from buildRealEstateJsonLd, which describes a single
 * listed project.
 */
export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE_NAME,
    description: SITE_TAGLINE,
    url: SITE_URL,
    logo: `${SITE_URL}/apple-icon.png`,
    image: `${SITE_URL}/apple-icon.png`,
    telephone: CONTACT_PHONE_TEL,
    email: CONTACT_EMAIL,
    areaServed: {
      "@type": "City",
      name: "Bengaluru",
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
  };
}

/**
 * Minimal WebSite entity — establishes the site as a distinct brand/entity
 * in Google's knowledge graph, separate from the RealEstateAgent listing.
 * No `potentialAction` (sitelinks search box) since there's no real
 * URL-addressable search endpoint to point it at.
 */
export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}
