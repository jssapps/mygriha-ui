import type { Metadata } from "next";
import ProjectsFilter from "@/components/ProjectsFilter";
import JsonLd from "@/components/JsonLd";
import { getAllProjects } from "@/data/projects";
import { buildBreadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Featured Apartment Projects in Bangalore",
  description:
    "A curated roster of newly launched apartment projects across Bangalore, each vetted directly with the builder and documented to the same standard.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Featured Projects", path: "/projects" },
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <JsonLd data={breadcrumbJsonLd} />
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-900/40">
        Featured Projects
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-sand-900 sm:text-4xl">
        A curated roster, not a directory
      </h1>
      <p className="mt-3 max-w-2xl text-sand-900/70">
        Every project here is vetted directly with its builder and
        documented to the same standard — same fields, same level of
        detail — so nothing is left to a brochure&apos;s word alone.
      </p>

      <ProjectsFilter projects={projects} />
    </div>
  );
}
