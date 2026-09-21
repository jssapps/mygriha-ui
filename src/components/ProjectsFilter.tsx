"use client";

import { useState } from "react";
import type { Project, ProjectStatus } from "@/types/project";
import ProjectCard from "@/components/ProjectCard";
import { statusLabel } from "@/lib/format";

const FILTERS: Array<ProjectStatus | "all"> = ["all", "ongoing", "upcoming", "completed"];

export default function ProjectsFilter({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectStatus | "all">("all");

  const visible = filter === "all" ? projects : projects.filter((p) => p.status === filter);

  return (
    <div>
      <div className="mt-6 flex flex-wrap gap-1 border-b border-sand-100">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`relative px-4 py-2.5 text-sm font-semibold transition-colors ${
              filter === f
                ? "text-sky-700"
                : "text-sand-900/50 hover:text-sand-900/80"
            }`}
          >
            {f === "all" ? "All Projects" : statusLabel(f)}
            {filter === f && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-sky-700" />}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-16 text-center text-sm text-sand-900/50">
          No projects match this filter right now — check back soon.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
