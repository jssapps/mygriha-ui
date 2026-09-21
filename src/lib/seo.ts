import type { Project } from "@/types/project";

// How buyers actually phrase this in search ("new launch near electronic
// city", "flats for investment"), not just a spec-sheet of configurations —
// keyed by the same status field the rest of the app already uses so this
// stays accurate as new projects with different statuses are added.
const STATUS_TITLE_PHRASE: Record<Project["status"], string> = {
  upcoming: "New Launch",
  ongoing: "Under-Construction Flats",
  completed: "Ready-to-Move Flats",
};

const STATUS_DESCRIPTION_PHRASE: Record<Project["status"], string> = {
  upcoming: "is a new launch",
  ongoing: "is currently under construction",
  completed: "is a ready-to-move project",
};

/**
 * Shared title/description builder for the homepage and every
 * /projects/[slug] page (they render the same primary project and must stay
 * in sync — see the canonical handling in projects/[slug]/page.tsx).
 */
export function buildProjectSeoMeta(project: Project): { title: string; description: string } {
  const firstConfig = project.configurations[0]?.label;
  const lastConfig = project.configurations[project.configurations.length - 1]?.label;
  const configRange =
    firstConfig && lastConfig && firstConfig !== lastConfig
      ? `${firstConfig}–${lastConfig}`
      : (firstConfig ?? "");

  const title = `${STATUS_TITLE_PHRASE[project.status]} Near ${project.location.city} | ${project.name}`;
  const description = `${project.name} ${STATUS_DESCRIPTION_PHRASE[project.status]} near ${project.location.city} in ${project.location.locality}, Bangalore — ${configRange} flats by ${project.builder}, a flat for investment or self-use on the Hosur Road corridor.`;

  return { title, description };
}
