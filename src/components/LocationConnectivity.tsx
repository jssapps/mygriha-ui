import type { LandmarkCategory, NearbyLandmark } from "@/types/project";
import MapEmbed from "@/components/MapEmbed";
import { cardClasses } from "@/lib/ui";

const CATEGORY_ORDER: LandmarkCategory[] = [
  "IT Park",
  "Metro",
  "Railway",
  "Road",
  "Hospital",
  "School",
  "Upcoming",
];

function groupByCategory(landmarks: NearbyLandmark[]) {
  return CATEGORY_ORDER.map((category) => ({
    category,
    items: landmarks.filter((l) => l.category === category),
  })).filter((group) => group.items.length > 0);
}

export default function LocationConnectivity({
  address,
  lat,
  lng,
  landmarks,
}: {
  address: string;
  lat: number;
  lng: number;
  landmarks: NearbyLandmark[];
}) {
  const groups = groupByCategory(landmarks);
  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <div className={`p-5 sm:p-6 ${cardClasses}`}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
          {groups.map((group) => (
            <div key={group.category}>
              <p className="text-xs font-semibold uppercase tracking-wide text-sand-900/50">
                {group.category}
              </p>
              <ul className="mt-2 space-y-2">
                {group.items.map((item) => (
                  <li key={item.name} className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-sand-900/80">{item.name}</span>
                    <span className="shrink-0 text-right text-sand-900/50">{item.distance}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <MapEmbed lat={lat} lng={lng} label={address} height={220} />
        <p className="text-sm text-sand-900/70">{address}</p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-800"
        >
          Open in Google Maps →
        </a>
      </div>
    </div>
  );
}
