import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";
import { formatInr } from "@/lib/format";
import SalesStageBadges from "@/components/SalesStageBadges";

export default function ProjectCard({ project }: { project: Project }) {
  const prices = project.configurations.map((c) => c.priceMinInr);
  const minPrice = Math.min(...prices);
  const configLabels = project.configurations.map((c) => c.label).join(" · ");

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-lg border border-sand-100 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-700/30 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand-100">
        <Image
          src={project.images.hero}
          alt={`${project.name} — ${project.location.locality}, ${project.location.city}`}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute left-3 top-3">
          <SalesStageBadges />
        </div>
      </div>

      <div className="p-5">
        <p className="text-base font-semibold text-sand-900">{project.name}</p>
        <p className="mt-0.5 text-sm text-sand-900/50">{project.location.locality}, {project.location.city}</p>
        <p className="mt-2 text-sm text-sand-900/70">{configLabels}</p>
        <p className="mt-2 text-sm font-semibold tabular-nums text-sky-700">
          {formatInr(minPrice)} onwards
        </p>
      </div>
    </Link>
  );
}
