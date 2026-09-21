"use client";

import Image from "next/image";
import { useState } from "react";
import type { FloorPlan, ProjectConfiguration } from "@/types/project";
import { formatPriceRange, formatSqftRange } from "@/lib/format";

/**
 * The one deliberate signature element on this page: a spec-sheet style
 * switcher that ties each configuration to its own floor plan and numbers,
 * instead of the usual disconnected "grid of floor plan thumbnails."
 * Terracotta is used here, and only here, as the single accent color.
 *
 * Each configuration can carry more than one layout variant (e.g. a "2 BHK"
 * with a corner-unit and a mid-block layout) — when it does, the plan image
 * becomes a small carousel instead of a single static image.
 */
export default function ConfigurationSwitcher({
  configurations,
  floorPlans,
}: {
  configurations: ProjectConfiguration[];
  floorPlans: FloorPlan[];
}) {
  const [activeLabel, setActiveLabel] = useState(configurations[0]?.label);
  const [slideIndex, setSlideIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const activeConfig = configurations.find((c) => c.label === activeLabel);
  const activePlan = floorPlans.find((p) => p.label === activeLabel);
  const images = activePlan?.images ?? [];
  const hasMultiple = images.length > 1;
  const currentImage = images[slideIndex];

  function selectConfig(label: string) {
    setActiveLabel(label);
    setSlideIndex(0);
  }

  function showSlide(index: number) {
    setSlideIndex((index + images.length) % images.length);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-sand-100 bg-white">
      <div className="flex overflow-x-auto border-b border-sand-100">
        {configurations.map((config) => {
          const isActive = config.label === activeLabel;
          return (
            <button
              key={config.label}
              type="button"
              onClick={() => selectConfig(config.label)}
              className={`relative whitespace-nowrap px-5 py-3.5 text-sm font-semibold transition-colors ${
                isActive ? "text-earth-600" : "text-sand-900/50 hover:text-sand-900/80"
              }`}
            >
              {config.label}
              {isActive && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-earth-500" />
              )}
            </button>
          );
        })}
      </div>

      {activeConfig && (
        <div className="grid gap-0 sm:grid-cols-2">
          <div className="relative aspect-[4/3] border-b border-sand-100 bg-sand-50 sm:border-b-0 sm:border-r">
            {currentImage ? (
              <>
                <button
                  type="button"
                  onClick={() => setZoomed(true)}
                  className="group absolute inset-0"
                  aria-label={`View ${activeConfig.label} floor plan full size`}
                >
                  <Image
                    src={currentImage}
                    alt={`${activeConfig.label} floor plan${hasMultiple ? ` — layout ${slideIndex + 1} of ${images.length}` : ""}`}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-contain p-4"
                  />
                  <span className="absolute bottom-3 right-3 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-sky-700 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                    View Full Size
                  </span>
                </button>

                {hasMultiple && (
                  <>
                    <button
                      type="button"
                      onClick={() => showSlide(slideIndex - 1)}
                      aria-label="Previous layout"
                      className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-sand-900 shadow-sm transition-colors hover:bg-sand-50"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={() => showSlide(slideIndex + 1)}
                      aria-label="Next layout"
                      className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-sand-900 shadow-sm transition-colors hover:bg-sand-50"
                    >
                      ›
                    </button>
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => showSlide(i)}
                          aria-label={`Show layout ${i + 1}`}
                          className={`h-1.5 w-1.5 rounded-full transition-colors ${
                            i === slideIndex ? "bg-earth-500" : "bg-sand-900/20"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-sand-900/50">
                Floor plan coming soon
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center gap-5 p-6 sm:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-sand-900/40">
                Starting price
              </p>
              <p className="mt-1 text-3xl font-bold tabular-nums text-earth-600 sm:text-4xl">
                {formatPriceRange(activeConfig.priceMinInr, activeConfig.priceMaxInr)}
              </p>
            </div>
            <div className="border-t border-dashed border-sand-100 pt-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-sand-900/40">
                Carpet area
              </p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-sand-900">
                {formatSqftRange(activeConfig.carpetAreaSqftMin, activeConfig.carpetAreaSqftMax)}
              </p>
            </div>
            {hasMultiple && (
              <p className="text-xs text-sand-900/50">
                {images.length} layout variants available for {activeConfig.label}
              </p>
            )}
          </div>
        </div>
      )}

      {zoomed && currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-sand-900/90 p-4"
          onClick={() => setZoomed(false)}
        >
          <button
            type="button"
            onClick={() => setZoomed(false)}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showSlide(slideIndex - 1);
                }}
                aria-label="Previous layout"
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showSlide(slideIndex + 1);
                }}
                aria-label="Next layout"
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                ›
              </button>
            </>
          )}

          <div className="relative h-[80vh] w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={currentImage}
              alt={`${activeLabel} floor plan${hasMultiple ? ` — layout ${slideIndex + 1} of ${images.length}` : ""}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-semibold text-white/80">
            {activeLabel}
            {hasMultiple ? ` — Layout ${slideIndex + 1} of ${images.length}` : ""}
          </p>
        </div>
      )}
    </div>
  );
}
