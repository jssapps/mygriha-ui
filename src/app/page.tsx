import type { Metadata } from "next";
import { getPrimaryProject } from "@/data/projects";
import ProjectPageContent from "@/components/ProjectPageContent";
import { buildProjectSeoMeta } from "@/lib/seo";

const project = getPrimaryProject();
const { title, description } = buildProjectSeoMeta(project);

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
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

export default function HomePage() {
  return (
    <ProjectPageContent
      project={project}
      path="/"
      breadcrumb={[
        { name: "Home", path: "/" },
        { name: project.name, path: "/" },
      ]}
    />
  );
}
