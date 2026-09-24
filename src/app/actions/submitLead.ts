"use server";

import { after } from "next/server";
import { createLead } from "@/lib/leads";
import { getClientIp, isRateLimited } from "@/lib/rateLimit";
import { escapeTelegramHtml, sendTelegramMessage } from "@/lib/telegram";
import { isValidEmail, normalizeIndianPhone } from "@/lib/validation";
import { getProjectBySlug } from "@/data/projects";
import { ALL_PROJECTS_LABEL, ALL_PROJECTS_SLUG } from "@/lib/constants";

export interface SubmitLeadInput {
  name: string;
  phone: string;
  email?: string;
  projectSlug?: string;
  projectName?: string;
  preferredVisitDate?: string;
  preferredCallTime?: string;
  message?: string;
  sourcePage: string;
}

export type SubmitLeadResult = { error: string } | { success: true };

const RATE_LIMIT = 5;
const MESSAGE_MAX_LENGTH = 1000;
const RATE_LIMIT_WINDOW_MS = 60_000;

export async function submitLead(input: SubmitLeadInput): Promise<SubmitLeadResult> {
  const totalStart = Date.now();
  const ip = await getClientIp();
  console.log(`submitLead: getClientIp took ${Date.now() - totalStart}ms`);
  if (isRateLimited(`submitLead:${ip}`, RATE_LIMIT, RATE_LIMIT_WINDOW_MS)) {
    return { error: "Too many submissions. Please try again in a minute." };
  }

  const name = input.name.trim();
  if (name.length < 2) {
    return { error: "Please enter your name." };
  }

  const phone = normalizeIndianPhone(input.phone);
  if (!phone) {
    return { error: "Please enter a valid 10-digit Indian mobile number." };
  }

  const email = input.email?.trim();
  if (email && !isValidEmail(email)) {
    return { error: "Please enter a valid email address, or leave it blank." };
  }

  // Project is required: either a real catalogue project or "All Projects".
  // The name is looked up here rather than trusted from the client.
  const projectSlug = input.projectSlug?.trim();
  const projectName =
    projectSlug === ALL_PROJECTS_SLUG
      ? ALL_PROJECTS_LABEL
      : projectSlug
        ? getProjectBySlug(projectSlug)?.name
        : undefined;
  if (!projectSlug || !projectName) {
    return { error: `Please choose a project, or pick "${ALL_PROJECTS_LABEL}".` };
  }

  // Optional free-text note; trimmed and capped so an oversized paste can't
  // bloat the stored lead or the Telegram notification.
  const message = input.message?.trim().slice(0, MESSAGE_MAX_LENGTH) || undefined;

  try {
    const start = Date.now();
    await createLead({
      name,
      phone,
      email: email || undefined,
      projectSlug,
      projectName,
      preferredVisitDate: input.preferredVisitDate,
      preferredCallTime: input.preferredCallTime,
      message,
      sourcePage: input.sourcePage,
    });
    console.log(`submitLead: createLead took ${Date.now() - start}ms`);
  } catch (err) {
    // Logged server-side only (Vercel Runtime Logs) — never sent to the client.
    console.error("submitLead: createLead failed", err);
    return { error: "Something went wrong while submitting. Please try again." };
  }

  // Runs after the response is sent, so the notification's network round-trip
  // doesn't add to the time the user waits for the form to confirm success.
  after(async () => {
    try {
      await sendTelegramMessage(formatLeadMessage({ ...input, name, phone, email, message, projectName }));
    } catch (err) {
      console.error("submitLead: telegram notify failed", err);
    }
  });

  console.log(`submitLead: total server time ${Date.now() - totalStart}ms`);
  return { success: true };
}

function formatLeadMessage(lead: {
  name: string;
  phone: string;
  email?: string;
  projectName?: string;
  sourcePage: string;
  preferredVisitDate?: string;
  preferredCallTime?: string;
  message?: string;
}): string {
  const esc = escapeTelegramHtml;
  const lines = [
    "🆕 New Lead",
    `Name: ${esc(lead.name)}`,
    `Phone: ${esc(lead.phone)}`,
  ];
  if (lead.email) lines.push(`Email: ${esc(lead.email)}`);
  if (lead.projectName) lines.push(`Project: ${esc(lead.projectName)}`);
  lines.push(`Source: ${esc(lead.sourcePage)}`);
  if (lead.preferredVisitDate || lead.preferredCallTime) {
    lines.push(
      `Preferred contact/visit: ${esc([lead.preferredVisitDate, lead.preferredCallTime].filter(Boolean).join(", "))}`
    );
  }
  if (lead.message) lines.push(`Message: ${esc(lead.message)}`);
  return lines.join("\n");
}
