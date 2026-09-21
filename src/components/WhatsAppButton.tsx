"use client";

import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function WhatsAppButton({ projectName }: { projectName?: string }) {
  return (
    <a
      href={buildWhatsAppLink(projectName)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-sage-600 text-white shadow-sm transition-colors hover:bg-sage-500 md:flex"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.42a9.87 9.87 0 0 0 4.62 1.17h.01c5.46 0 9.9-4.45 9.9-9.9 0-2.65-1.03-5.13-2.9-7C17.17 3.03 14.69 2 12.04 2Zm0 1.67c2.24 0 4.33.87 5.9 2.45a8.3 8.3 0 0 1 2.44 5.79c0 4.53-3.7 8.23-8.25 8.23a8.2 8.2 0 0 1-4.19-1.15l-.3-.17-3.22.84.86-3.13-.19-.32a8.18 8.18 0 0 1-1.26-4.38c0-4.53 3.7-8.16 8.21-8.16Zm-4.5 4.6c-.16 0-.42.06-.64.31-.22.25-.85.83-.85 2.02s.87 2.35.99 2.51c.12.16 1.7 2.6 4.13 3.64 2.02.87 2.43.7 2.87.65.44-.04 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.32-.75-1.8-.2-.47-.4-.4-.54-.41Z" />
      </svg>
    </a>
  );
}
