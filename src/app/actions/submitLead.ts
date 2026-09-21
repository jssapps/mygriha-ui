"use server";

import { after } from "next/server";
import { createLead } from "@/lib/leads";
import { getClientIp, isRateLimited } from "@/lib/rateLimit";
import { escapeTelegramHtml, sendTelegramMessage } from "@/lib/telegram";
import { isValidEmail, normalizeIndianPhone } from "@/lib/validation";

export interface SubmitLeadInput {
  name: string;
  phone: string;
  email?: string;
  projectSlug?: string;
  projectName?: string;
  preferredVisitDate?: string;
  preferredCallTime?: string;
  sourcePage: string;
}

export type SubmitLeadResult = { error: string } | { success: true };

const RATE_LIMIT = 5;
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

  try {
    const start = Date.now();
    await createLead({
      name,
      phone,
      email: email || undefined,
      projectSlug: input.projectSlug,
      projectName: input.projectName,
      preferredVisitDate: input.preferredVisitDate,
      preferredCallTime: input.preferredCallTime,
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
      await sendTelegramMessage(formatLeadMessage({ ...input, name, phone, email }));
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
      `Preferred visit: ${esc([lead.preferredVisitDate, lead.preferredCallTime].filter(Boolean).join(", "))}`
    );
  }
  return lines.join("\n");
}
