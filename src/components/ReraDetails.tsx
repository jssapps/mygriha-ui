"use client";

import { useState } from "react";

interface ReraDetailsProps {
  possessionDate: string;
  acknowledgementNo?: string;
  registrationNo?: string;
  websiteUrl?: string;
}

/**
 * Possession + RERA block shown under the project hero. Both RERA numbers
 * have a copy button so buyers can paste them straight into the RERA
 * portal's search.
 */
export default function ReraDetails({
  possessionDate,
  acknowledgementNo,
  registrationNo,
  websiteUrl,
}: ReraDetailsProps) {
  return (
    <dl className="mt-6 grid gap-x-6 gap-y-1.5 text-sm text-sand-50/85 sm:grid-cols-[auto_1fr]">
      <dt className="text-sand-50/60">Possession</dt>
      <dd className="font-semibold text-white">{possessionDate}</dd>

      {acknowledgementNo && (
        <>
          <dt className="text-sand-50/60">RERA Acknowledgement No</dt>
          <dd>
            <CopyValue value={acknowledgementNo} label="RERA acknowledgement number" />
          </dd>
        </>
      )}

      {registrationNo ? (
        <>
          <dt className="text-sand-50/60">RERA Registration No</dt>
          <dd>
            <CopyValue value={registrationNo} label="RERA registration number" />
          </dd>
        </>
      ) : (
        <>
          <dt className="text-sand-50/60">RERA</dt>
          <dd>Registration awaited</dd>
        </>
      )}

      {websiteUrl && (
        <>
          <dt className="text-sand-50/60">RERA website</dt>
          <dd>
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-white underline underline-offset-2 hover:text-earth-100"
            >
              {websiteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M4 2h6v6M10 2 3 9" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </dd>
        </>
      )}
    </dl>
  );
}

function CopyValue({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Fallback for browsers/contexts without the async clipboard API.
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <span className="break-all font-semibold tabular-nums text-white">{value}</span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy ${label}`}
        className="inline-flex items-center gap-1 rounded border border-white/30 px-2 py-0.5 text-xs font-medium text-white transition-colors hover:border-white/60"
      >
        {copied ? (
          <>
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2.5 6.5 5 9l4.5-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Copied
          </>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M2 8V2.8C2 2.4 2.4 2 2.8 2H8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Copy
          </>
        )}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? `${label} copied` : ""}
      </span>
    </span>
  );
}
