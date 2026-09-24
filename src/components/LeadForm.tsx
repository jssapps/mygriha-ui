"use client";

import { useId, useState, useTransition } from "react";
import { submitLead } from "@/app/actions/submitLead";
import {
  ALL_PROJECTS_LABEL,
  ALL_PROJECTS_SLUG,
  AUTHORIZED_CHANNEL_PARTNER_LABEL,
  PREFERRED_CALL_TIMES,
} from "@/lib/constants";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { isValidEmail, normalizeIndianPhone } from "@/lib/validation";
import { buttonClasses, formControlClasses } from "@/lib/ui";
import ProjectCombobox from "./ProjectCombobox";

export interface LeadFormProjectOption {
  slug: string;
  name: string;
}

type InvalidField = "name" | "phone" | "project" | "email" | null;

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

const MESSAGE_MAX_LENGTH = 1000;

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
  heading = "Get a callback from our My Griha team",
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
  const [message, setMessage] = useState("");
  const [projectSlug, setProjectSlug] = useState(defaultProjectSlug || ALL_PROJECTS_SLUG);
  const [showOptional, setShowOptional] = useState(false);
  const optionalId = useId();
  const [error, setError] = useState<string | null>(null);
  const [invalidField, setInvalidField] = useState<InvalidField>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const project = projects.find((p) => p.slug === projectSlug);
  // "All Projects" leads the list so it's one tap away even after searching.
  const projectChoices = [{ slug: ALL_PROJECTS_SLUG, name: ALL_PROJECTS_LABEL }, ...projects];

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
    if (!projectSlug) {
      setError(`Please choose a project, or pick "${ALL_PROJECTS_LABEL}".`);
      setInvalidField("project");
      return;
    }
    const trimmedEmail = email.trim();
    if (trimmedEmail && !isValidEmail(trimmedEmail)) {
      setError("Please enter a valid email address, or leave it blank.");
      setInvalidField("email");
      setShowOptional(true);
      return;
    }

    startTransition(async () => {
      const result = await submitLead({
        name,
        phone,
        email,
        projectSlug,
        projectName: project?.name ?? ALL_PROJECTS_LABEL,
        preferredVisitDate: preferredVisitDate || undefined,
        preferredCallTime: preferredCallTime || undefined,
        message: message.trim() || undefined,
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
      {/* Brand block names the picked project; with no project picked yet it
          falls back to the generic heading. */}
      {brandName && project ? (
        <>
          <p className="text-lg font-bold tracking-tight text-sand-900">{project.name}</p>
          <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-sand-900/50">
            {AUTHORIZED_CHANNEL_PARTNER_LABEL}
          </p>
        </>
      ) : (
        <>
          <p className="text-lg font-bold tracking-tight text-sand-900">{heading}</p>
          <p className="mt-1 text-xs text-sand-900/50">
            Just your name and number, and we&apos;ll call you back. No spam, ever.
          </p>
        </>
      )}

      {/* Required: name, phone and project, always visible. */}
      <div className="mt-5 space-y-3">
        <label className="block text-xs font-medium text-sand-900/80">
          Your name <span className="text-red-600" aria-hidden="true">*</span>
          <input
            required
            type="text"
            autoComplete="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (invalidField === "name") {
                setInvalidField(null);
                setError(null);
              }
            }}
            aria-invalid={invalidField === "name"}
            className={`mt-1.5 ${formControlClasses} ${invalidField === "name" ? invalidFieldClasses : ""}`}
          />
        </label>
        <label className="block text-xs font-medium text-sand-900/80">
          Phone number <span className="text-red-600" aria-hidden="true">*</span>
          <input
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="10-digit mobile number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (invalidField === "phone") {
                setInvalidField(null);
                setError(null);
              }
            }}
            aria-invalid={invalidField === "phone"}
            className={`mt-1.5 ${formControlClasses} ${invalidField === "phone" ? invalidFieldClasses : ""}`}
          />
        </label>
        <div className="text-xs font-medium text-sand-900/80">
          Project <span className="text-red-600" aria-hidden="true">*</span>
          <div className="mt-1.5">
            <ProjectCombobox
              options={projectChoices}
              value={projectSlug}
              onChange={(slug) => {
                setProjectSlug(slug);
                if (invalidField === "project") {
                  setInvalidField(null);
                  setError(null);
                }
              }}
              placeholder="Type to search projects"
              invalid={invalidField === "project"}
            />
          </div>
        </div>
        <p className="text-[11px] text-sand-900/50">
          <span className="text-red-600">*</span> Required
        </p>
      </div>

      {/* Optional: tucked behind a toggle so the form looks short at first glance. */}
      <div className="mt-4 rounded-md border border-dashed border-sand-100">
        <button
          type="button"
          onClick={() => setShowOptional((v) => !v)}
          aria-expanded={showOptional}
          aria-controls={optionalId}
          className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm font-medium text-sky-700 hover:text-sky-800"
        >
          <span>
            {showOptional ? "Hide optional details" : "Add more details"}{" "}
            <span className="font-normal text-sand-900/50">(optional)</span>
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            aria-hidden="true"
            className={`transition-transform ${showOptional ? "rotate-180" : ""}`}
          >
            <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          id={optionalId}
          hidden={!showOptional}
          className="space-y-3 border-t border-dashed border-sand-100 px-3 pb-3 pt-3"
        >
          <label className="block text-xs text-sand-900/60">
            Email
            <input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (invalidField === "email") {
                  setInvalidField(null);
                  setError(null);
                }
              }}
              aria-invalid={invalidField === "email"}
              className={`mt-1.5 ${formControlClasses} ${invalidField === "email" ? invalidFieldClasses : ""}`}
            />
          </label>

          <label className="block text-xs text-sand-900/60">
            Preferred date to contact/visit
            <input
              type="date"
              min={todayIso()}
              value={preferredVisitDate}
              onChange={(e) => setPreferredVisitDate(e.target.value)}
              className={`mt-1.5 ${formControlClasses}`}
            />
          </label>

          <label className="block text-xs text-sand-900/60">
            Preferred time to call
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

          <label className="block text-xs text-sand-900/60">
            Message
            <textarea
              rows={3}
              maxLength={MESSAGE_MAX_LENGTH}
              placeholder="Anything you'd like us to know, such as budget, configuration or questions"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`mt-1.5 resize-y ${formControlClasses}`}
            />
          </label>
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={isPending} className={`mt-5 w-full ${buttonClasses("primary")}`}>
        {isPending ? "Submitting..." : "Get Callback"}
      </button>
    </form>
  );
}
