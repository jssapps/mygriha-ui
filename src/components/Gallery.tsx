"use client";

import Image from "next/image";
import { useState } from "react";

export default function Gallery({
  images,
  alt,
  labels,
}: {
  images: string[];
  alt: string;
  /** Optional, index-aligned category labels (e.g. "Exterior", "Clubhouse"). */
  labels?: string[];
}) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            className="group relative aspect-square overflow-hidden rounded-lg bg-sand-100"
          >
            <Image
              src={src}
              alt={`${alt} — ${labels?.[i] ?? `photo ${i + 1}`}`}
              fill
              sizes="(min-width: 640px) 25vw, 50vw"
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
            />
            <span className="absolute inset-0 bg-sand-900/0 transition-colors duration-300 group-hover:bg-sand-900/10" />
            {labels?.[i] && (
              <span className="absolute bottom-2 left-2 rounded-md bg-sand-900/70 px-2 py-1 text-[11px] font-semibold text-white">
                {labels[i]}
              </span>
            )}
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-sand-900/90 p-4"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
          <div className="relative h-[80vh] w-full max-w-3xl">
            <Image
              src={images[active]}
              alt={`${alt} — ${labels?.[active] ?? `photo ${active + 1}`}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          {labels?.[active] && (
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-semibold text-white/80">
              {labels[active]}
            </p>
          )}
        </div>
      )}
    </>
  );
}
