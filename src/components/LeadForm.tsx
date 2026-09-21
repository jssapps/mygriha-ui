"use client";

import { useState, useTransition } from "react";
import { submitLead } from "@/app/actions/submitLead";
import { AUTHORIZED_CHANNEL_PARTNER_LABEL, PREFERRED_CALL_TIMES } from "@/lib/constants";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { isValidEmail, normalizeIndianPhone } from "@/lib/validation";
import { buttonClasses, formControlClasses } from "@/lib/ui";

export interface LeadFormProjectOption {
  slug: string;
  name: string;
}

type InvalidField = "name" | "phone" | "email" | null;

interface LeadFormProps {
  projects: LeadFormProjectOption[];
  defaultProjectSlug?: string;
  sourcePage: string;
  heading?: string;
  /** When set, replaces the heading/subtext with a project-name + "Authorized channel partner" brand block — used by the popup. */
  brandName?: string;
  compact?: boolean;
  /** Called once the lead is successfully submitted (after the inline thank-you message renders). */
  onSuccess?: () => void;
  /** Hide the "Continue on WhatsApp" CTA in the post-submit state — e.g. inside the popup, which already auto-closes. */
  showWhatsAppCta?: boolean;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

// `!` forces these to win over formControlClasses's own border/ring utilities —
// Tailwind resolves same-property conflicts by generated CSS order, not by
// position in the className string, so a plain override here isn't reliable.
const invalidFieldClasses = "!border-red-400 focus:!border-red-500 focus:!ring-red-500/20";

export default function LeadForm({
  projects,
  defaultProjectSlug,
  sourcePage,
  heading = "Get a callback from our advisory team",
  brandName,
  compact = false,
  onSuccess,
  showWhatsAppCta = true,
}: LeadFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredVisitDate, setPreferredVisitDate] = useState("");
  const [preferredCallTime, setPreferredCallTime] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [invalidField, setInvalidField] = useState<InvalidField>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const project = projects.find((p) => p.slug === defaultProjectSlug);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInvalidField(null);

    // Validated client-side first (same rules submitLead enforces server-side)
    // so obvious mistakes surface instantly, with no network round trip.
    if (name.trim().length < 2) {
      setError("Please enter your name.");
      setInvalidField("name");
      return;
    }
    if (!normalizeIndianPhone(phone)) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      setInvalidField("phone");
      return;
    }
    const trimmedEmail = email.trim();
    if (trimmedEmail && !isValidEmail(trimmedEmail)) {
      setError("Please enter a valid email address, or leave it blank.");
      setInvalidField("email");
      return;
    }

    startTransition(async () => {
      const result = await submitLead({
        name,
        phone,
        email,
        projectSlug: defaultProjectSlug || undefined,
        projectName: project?.name,
        preferredVisitDate: preferredVisitDate || undefined,
        preferredCallTime: preferredCallTime || undefined,
        sourcePage,
      });
      if ("error" in result) {
        setError(result.error);
        return;
      }
      setSubmitted(true);
      onSuccess?.();
    });
  }

  if (submitted) {
    return (
      <div
        className={`flex flex-col items-center rounded-lg border border-sand-100 bg-white text-center ${compact ? "p-5" : "p-6"}`}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-sage-500/30 bg-sage-50 text-sage-600">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="mt-4 text-lg font-bold tracking-tight text-sand-900">
          Thanks — we&apos;ve got your details
        </p>
        <p className="mt-1.5 text-sm text-sand-900/60">
          {showWhatsAppCta
            ? "A member of our advisory team will call you shortly. For the fastest response, continue the conversation on WhatsApp now."
            : "A member of our advisory team will call you shortly."}
        </p>
        {showWhatsAppCta && (
          <a
            href={buildWhatsAppLink(project?.name)}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-5 w-full ${buttonClasses("primary")}`}
          >
            Continue on WhatsApp
          </a>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-lg border border-sand-100 bg-white ${compact ? "p-5" : "p-6"}`}
    >
      {brandName ? (
        <>
          <p className="text-lg font-bold tracking-tight text-sand-900">{brandName}</p>
          <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-sand-900/50">
            {AUTHORIZED_CHANNEL_PARTNER_LABEL}
          </p>
        </>
      ) : (
        <>
          <p className="text-lg font-bold tracking-tight text-sand-900">{heading}</p>
          <p className="mt-1 text-xs text-sand-900/50">
            Share your details and our advisory team will call you back — no spam, ever.
          </p>
        </>
      )}

      <div className="mt-5 space-y-3">
        <input
          required
          type="text"
          placeholder="Your name*"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (invalidField === "name") {
              setInvalidField(null);
              setError(null);
            }
          }}
          aria-invalid={invalidField === "name"}
          className={`${formControlClasses} ${invalidField === "name" ? invalidFieldClasses : ""}`}
        />
        <input
          required
          type="tel"
          inputMode="tel"
          placeholder="Phone number*"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            if (invalidField === "phone") {
              setInvalidField(null);
              setError(null);
            }
          }}
          aria-invalid={invalidField === "phone"}
          className={`${formControlClasses} ${invalidField === "phone" ? invalidFieldClasses : ""}`}
        />
        <input
          type="email"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (invalidField === "email") {
              setInvalidField(null);
              setError(null);
            }
          }}
          aria-invalid={invalidField === "email"}
          className={`${formControlClasses} ${invalidField === "email" ? invalidFieldClasses : ""}`}
        />

        <label className="block text-xs text-sand-900/60">
          Preferred visit date (optional)
          <input
            type="date"
            min={todayIso()}
            value={preferredVisitDate}
            onChange={(e) => setPreferredVisitDate(e.target.value)}
            className={`mt-1.5 ${formControlClasses}`}
          />
        </label>

        <label className="block text-xs text-sand-900/60">
          Preferred time to call (optional)
          <select
            value={preferredCallTime}
            onChange={(e) => setPreferredCallTime(e.target.value)}
            className={`mt-1.5 ${formControlClasses}`}
          >
            <option value="">Select a time</option>
            {PREFERRED_CALL_TIMES.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={isPending} className={`mt-5 w-full ${buttonClasses("primary")}`}>
        {isPending ? "Submitting..." : "Get Callback"}
      </button>
    </form>
  );
}
