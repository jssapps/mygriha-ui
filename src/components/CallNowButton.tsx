import { CONTACT_PHONE_TEL } from "@/lib/constants";

export default function CallNowButton({
  className,
  children = "Call Now",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a href={`tel:${CONTACT_PHONE_TEL}`} className={className}>
      {children}
    </a>
  );
}
