import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjects, getPrimaryProject, getProjectBySlug } from "@/data/projects";
import ProjectPageContent from "@/components/ProjectPageContent";
import { buildProjectSeoMeta } from "@/lib/seo";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const { title, description } = buildProjectSeoMeta(project);
  // The primary project renders identical content on "/" — canonicalize
  // this route to the homepage instead of self-canonicalizing, so the two
  // URLs don't compete as duplicate content for the same search queries.
  const isPrimary = getPrimaryProject().slug === project.slug;
  const canonicalPath = isPrimary ? "/" : `/projects/${project.slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      images: [project.images.hero],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.images.hero],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <ProjectPageContent
      project={project}
      path={`/projects/${project.slug}`}
      breadcrumb={[
        { name: "Home", path: "/" },
        { name: "Featured Projects", path: "/projects" },
        { name: project.name, path: `/projects/${project.slug}` },
      ]}
    />
  );
}
