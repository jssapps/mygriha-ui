import type { SpecificationGroup } from "@/types/project";
import Accordion from "@/components/Accordion";

export default function Specifications({ specifications }: { specifications: SpecificationGroup[] }) {
  return (
    <Accordion
      items={specifications.map((group) => ({
        key: group.category,
        title: group.category,
        content:
          group.items.length > 0 ? (
            <ul className="space-y-1.5">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sand-900/40">To be confirmed with the builder.</p>
          ),
      }))}
    />
  );
}
