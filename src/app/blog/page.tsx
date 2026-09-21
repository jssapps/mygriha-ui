import type { Metadata } from "next";
import BlogFilter from "@/components/BlogFilter";
import JsonLd from "@/components/JsonLd";
import { getAllPosts, BLOG_CATEGORIES } from "@/data/posts";
import { buildBreadcrumbJsonLd } from "@/lib/jsonld";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Insights — Bangalore Real Estate",
  description: `Buying guides, area guides, and investment notes on newly launched apartment projects across Bangalore, from ${SITE_NAME}.`,
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Insights", path: "/blog" },
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <JsonLd data={breadcrumbJsonLd} />
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-900/40">Insights</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-sand-900 sm:text-4xl">
        Notes on buying in Bangalore
      </h1>
      <p className="mt-3 max-w-2xl text-sand-900/70">
        Buying guides, corridor breakdowns, and investment notes — written to
        the same standard of verified fact as the rest of this site, not
        marketing copy dressed up as advice.
      </p>

      <BlogFilter posts={posts} categories={BLOG_CATEGORIES} />
    </div>
  );
}
