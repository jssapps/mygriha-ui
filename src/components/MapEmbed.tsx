export default function MapEmbed({
  lat,
  lng,
  label,
  height = 360,
}: {
  lat: number;
  lng: number;
  label: string;
  height?: number;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-sand-100">
      <iframe
        title={`Map location for ${label}`}
        src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
        width="100%"
        height={height}
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
