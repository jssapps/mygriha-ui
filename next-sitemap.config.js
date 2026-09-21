/** @type {import('next-sitemap').IConfig} */

// Higher priority/more frequent changefreq for pages that actually drive
// search intent (home, project pages) vs. static/legal pages.
const PRIORITY_BY_PATH = {
  "/": 1.0,
  "/projects": 0.8,
  "/blog": 0.6,
  "/about": 0.5,
  "/contact": 0.5,
  "/terms": 0.2,
  "/privacy-policy": 0.2,
};

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  generateRobotsTxt: true,
  // next-sitemap's default crawler also picks up static app-icon files
  // (favicon.ico, icon.svg, apple-icon.png) as if they were pages — exclude
  // them, along with admin/api routes.
  //
  // Also excludes the primary project's own /projects/[slug] URL: that page
  // sets <link rel="canonical"> to "/" (see app/projects/[slug]/page.tsx,
  // getPrimaryProject check) since it renders identical content to the
  // homepage. Listing both in the sitemap while the canonical disagrees
  // sends a mixed signal to crawlers, so only "/" is listed. Keep this in
  // sync with src/data/projects.ts if the featured/primary project changes.
  exclude: [
    "/admin",
    "/admin/*",
    "/api/*",
    "/favicon.ico",
    "/icon.svg",
    "/apple-icon.png",
    "/projects/signature-regal-electronic-city-chandapura",
  ],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api"] }],
  },
  transform: async (config, path) => ({
    loc: path,
    lastmod: new Date().toISOString(),
    changefreq: path.startsWith("/projects/") ? "weekly" : (PRIORITY_BY_PATH[path] ?? 0.6) >= 0.6 ? "weekly" : "monthly",
    priority: path.startsWith("/projects/") ? 0.9 : (PRIORITY_BY_PATH[path] ?? 0.6),
  }),
};
