import Image from "next/image";
import type { Project } from "@/types/project";
import { formatInr, formatPriceRange } from "@/lib/format";
import { buildRealEstateJsonLd, buildFaqJsonLd, buildBreadcrumbJsonLd } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
import SalesStageBadges from "@/components/SalesStageBadges";
import SectionNav from "@/components/SectionNav";
import BriefSection from "@/components/BriefSection";
import StatBand from "@/components/StatBand";
import ClosingCta from "@/components/ClosingCta";
import ConstructionProgress from "@/components/ConstructionProgress";
import ConfigurationTable from "@/components/ConfigurationTable";
import ConfigurationSwitcher from "@/components/ConfigurationSwitcher";
import AmenitiesList from "@/components/AmenitiesList";
import Gallery from "@/components/Gallery";
import WhatsAppButton from "@/components/WhatsAppButton";
import OpenLeadPopupButton from "@/components/OpenLeadPopupButton";
import CallNowButton from "@/components/CallNowButton";
import Stat from "@/components/Stat";
import ProjectHighlights, { buildHighlights } from "@/components/ProjectHighlights";
import LocationConnectivity from "@/components/LocationConnectivity";
import Specifications from "@/components/Specifications";
import WhyInvest from "@/components/WhyInvest";
import BuilderInfo from "@/components/BuilderInfo";
import Faqs from "@/components/Faqs";
import { buttonClasses } from "@/lib/ui";
import { CONTACT_PHONE_DISPLAY } from "@/lib/constants";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "configurations", label: "Price" },
  { id: "floor-plans", label: "Floor Plans" },
  { id: "amenities", label: "Amenities" },
  { id: "gallery", label: "Gallery" },
  { id: "location", label: "Location" },
  { id: "why-invest", label: "Why Invest" },
  { id: "faqs", label: "FAQs" },
];

const GALLERY_LABELS = ["Exterior", "Clubhouse", "Pool", "Garden"];

/**
 * The full "Advisory Brief" page — hero through closing CTA — for a single
 * project. Shared by the homepage (primary project) and every
 * /projects/[slug] page so the two never drift out of sync.
 */
export default function ProjectPageContent({
  project,
  path,
  breadcrumb,
}: {
  project: Project;
  path: string;
  breadcrumb: { name: string; path: string }[];
}) {
  const configLabels = project.configurations.map((c) => c.label).join("/");
  const minPrice = Math.min(...project.configurations.map((c) => c.priceMinInr));
  const maxPrice = Math.max(...project.configurations.map((c) => c.priceMaxInr));
  const firstConfig = project.configurations[0]?.label;
  const lastConfig = project.configurations[project.configurations.length - 1]?.label;

  const jsonLd = buildRealEstateJsonLd(project, path);
  const faqJsonLd = buildFaqJsonLd(project.faqs);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(breadcrumb);

  return (
    <div>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <WhatsAppButton projectName={project.name} />

      {/* Hero: full-bleed photography, headline carries the specific facts
          (towers/acreage/config/price) rather than a generic tagline. */}
      <section className="relative h-[88vh] min-h-[620px] w-full overflow-hidden bg-sky-800">
        <Image
          src={project.images.hero}
          alt={`${project.name} in ${project.location.locality}, Bengaluru`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sky-900/95 via-sky-900/50 to-sky-900/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/70 via-sky-900/20 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-24 sm:px-6 sm:pb-28">
          <div className="animate-fade-in max-w-2xl [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]">
            <div className="flex flex-wrap items-center gap-3">
              <SalesStageBadges />
              <p className="inline-flex items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-[0_2px_8px_rgba(0,0,0,0.3)] ring-1 ring-inset ring-white/20 backdrop-blur-sm">
                <svg width="11" height="11" viewBox="0 0 20 20" fill="none" className="shrink-0" aria-hidden="true">
                  <path
                    d="M10 18s6-5.686 6-10a6 6 0 1 0-12 0c0 4.314 6 10 6 10Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                {project.location.locality}, {project.location.city}
              </p>
            </div>

            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] text-white sm:text-6xl">
              {project.totalTowers} towers on {project.totalAreaAcres} acres —{" "}
              <span className="text-earth-400">
                {firstConfig} to {lastConfig}
              </span>{" "}
              homes from {formatInr(minPrice)}
            </h1>

            <p className="mt-5 max-w-lg text-base text-sand-50/85 sm:text-lg">{project.tagline}.</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <OpenLeadPopupButton intent="site-visit" className={buttonClasses("primary")}>
                Book Site Visit
              </OpenLeadPopupButton>
              <OpenLeadPopupButton
                intent="brochure"
                className="rounded-md border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/60"
              >
                Download Brochure
              </OpenLeadPopupButton>
            </div>

            <p className="mt-6 text-sm text-sand-50/80">
              Possession: {project.possessionDate} · RERA:{" "}
              {/* {project.reraStatus === "registered" && project.reraId
                ? project.reraId
                : "registration awaited"}{" "}
              ·{" "}
              <CallNowButton className="underline underline-offset-2 hover:text-white">
                Call {CONTACT_PHONE_DISPLAY}
              </CallNowButton> */}
            </p>
          </div>
        </div>
      </section>

      {/* Quick facts strip — overlaps the hero edge to read as one continuous
          moment rather than a separate boxed section. */}
      <div className="relative z-20 mx-auto -mt-10 max-w-6xl px-4 sm:-mt-12 sm:px-6">
        <div className="grid grid-cols-2 divide-x divide-y divide-sand-100 rounded-lg border border-sand-100 bg-white shadow-xl shadow-sand-900/10 sm:grid-cols-4 sm:divide-y-0">
          <Stat label="Price" value={formatPriceRange(minPrice, maxPrice)} />
          <Stat label="Configurations" value={configLabels.replace(/\//g, ", ")} />
          <Stat label="Possession" value={project.possessionDate} />
          <Stat
            label="RERA Status"
            value={
              project.reraStatus === "registered" && project.reraId
                ? project.reraId
                : "Registration awaited"
            }
          />
        </div>
      </div>

      <SectionNav items={SECTIONS} />

      <>
        <BriefSection
          id="overview"
          eyebrow="The Opportunity"
          title="Built around open ground, not around itself"
          intro={project.description}
        >
          <ProjectHighlights highlights={buildHighlights(project)} />
        </BriefSection>

        {project.openSpacePercent !== undefined && (
          <StatBand
            value={`${project.openSpacePercent}%`}
            label={`of the ${project.totalAreaAcres}-acre site kept open, across gardens and walking paths`}
          />
        )}

        <BriefSection
          id="configurations"
          eyebrow="Price & Configurations"
          title="Compare every unit type at a glance"
          tone="muted"
        >
          <ConfigurationTable configurations={project.configurations} />
          <p className="mt-3 text-xs text-sand-900/50">
            Prices shown are indicative and subject to change — confirm the
            current price list with the advisory team before booking.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <OpenLeadPopupButton intent="brochure" className={buttonClasses("secondary")}>
              Request Cost Sheet
            </OpenLeadPopupButton>
            <OpenLeadPopupButton intent="site-visit" className={buttonClasses("primary")}>
              Book Site Visit
            </OpenLeadPopupButton>
          </div>
        </BriefSection>

        <BriefSection
          id="floor-plans"
          eyebrow="Floor Plans"
          title="Pick a configuration to see its layout and price"
        >
          <ConfigurationSwitcher configurations={project.configurations} floorPlans={project.floorPlans} />
          <div className="mt-5">
            <OpenLeadPopupButton intent="brochure" className={buttonClasses("secondary")}>
              Download Floor Plan
            </OpenLeadPopupButton>
          </div>
        </BriefSection>

        <BriefSection
          id="amenities"
          eyebrow="Amenities"
          title="Amenities designed for modern living"
          intro={`${
            project.amenitiesCount !== undefined
              ? `${project.amenitiesCount}+ lifestyle amenities, all shared`
              : "Every amenity below is shared"
          } across all ${project.totalTowers} towers — laid out around the landscaped core, not squeezed into leftover space.`}
          tone="muted"
        >
          <AmenitiesList amenities={project.amenities} />
        </BriefSection>

        <BriefSection
          id="specifications"
          eyebrow="Specifications"
          title="Build quality, category by category"
          intro={`Full spec-sheet details are pending confirmation from ${project.builder} — categories below will be filled in once the brochure spec sheet is available.`}
        >
          <Specifications specifications={project.specifications} />
        </BriefSection>

        <BriefSection id="gallery" eyebrow="Gallery" title="A closer look" tone="muted">
          <Gallery images={project.images.gallery} alt={project.name} labels={GALLERY_LABELS} />
        </BriefSection>

        <BriefSection
          id="location"
          eyebrow="Location & Connectivity"
          title={`${project.location.locality}, ${project.location.city}`}
        >
          <LocationConnectivity
            address={project.location.address}
            lat={project.location.lat}
            lng={project.location.lng}
            landmarks={project.nearbyLandmarks}
          />
        </BriefSection>

        <BriefSection
          id="why-invest"
          eyebrow="Why Invest"
          title={`Is ${project.name} a good flat for investment near ${project.location.city}?`}
          tone="muted"
        >
          <WhyInvest />
        </BriefSection>

        {project.constructionUpdate && (
          <BriefSection
            id="construction"
            eyebrow="Construction Progress"
            title="Where the build stands today"
          >
            <ConstructionProgress update={project.constructionUpdate} />
          </BriefSection>
        )}

        <BriefSection
          id="builder"
          eyebrow="The Builder"
          title="Who's developing this project"
          tone="muted"
        >
          <BuilderInfo builder={project.builder} info={project.builderInfo} />
        </BriefSection>

        <BriefSection id="faqs" eyebrow="FAQs" title="Common questions">
          <Faqs faqs={project.faqs} />
        </BriefSection>
      </>

      <ClosingCta projectName={project.name} />
    </div>
  );
}
