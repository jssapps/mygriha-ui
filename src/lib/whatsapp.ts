import { WHATSAPP_NUMBER } from "@/lib/constants";

export function buildWhatsAppLink(projectName?: string): string {
  const message = projectName
    ? `Hi, I'm interested in ${projectName}. Could you share more details?`
    : "Hi, I'm looking for flats in Bangalore. Could you help me?";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
