import { cardClasses } from "@/lib/ui";

/**
 * Built entirely from sourced, defensible facts (see src/data/projects.ts
 * VERIFY comments) — no rental-yield or price-appreciation percentages,
 * since those aren't verifiable claims to make on a real builder's behalf.
 */
const REASONS = [
  {
    title: "On Bengaluru's operational Yellow Line corridor",
    body: "The Yellow Line metro (RV Road–Bommasandra) opened in August 2025 and runs the length of Hosur Road through Electronic City — one of the few IT-corridor stretches in Bengaluru with a fully operational metro link today, not just a promised one.",
  },
  {
    title: "Minutes from Electronic City's job cluster",
    body: "Direct access via Hosur Road (NH48/NH44) keeps South Bengaluru's largest IT hub within a short drive, without the price premium of living inside the core.",
  },
  {
    title: "More road capacity on the way",
    body: "The upcoming Satellite Town Ring Road is expected to further shorten commutes along this stretch once it opens.",
  },
  {
    title: "A large upcoming development nearby",
    body: "The corridor is close to the planned 1,000-acre SWIFT City development — the kind of large-scale infrastructure that tends to bring more jobs and demand to the surrounding belt over time.",
  },
  {
    title: "A growing corridor",
    body: "As Electronic City's tech cluster keeps expanding, demand along the wider Hosur Road belt has been growing — though, as with any property investment, rental yields and price appreciation depend on market conditions and aren't guaranteed.",
  },
];

export default function WhyInvest() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
      {REASONS.map((r) => (
        <div key={r.title} className={`p-5 sm:p-6 ${cardClasses}`}>
          <p className="text-sm font-bold text-sand-900">{r.title}</p>
          <p className="mt-2 text-sm text-sand-900/70">{r.body}</p>
        </div>
      ))}
    </div>
  );
}
