/**
 * Escapes the characters Telegram's HTML parse_mode treats as markup, so
 * user-supplied text (e.g. a lead's name) can't inject tags — most notably
 * `<a href="...">` links, which would otherwise let a form submission plant
 * a phishing link in the notification an admin reads on their phone.
 */
export function escapeTelegramHtml(input: string): string {
  return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Fire-and-log Telegram notifier. A missing config or a failed request is
 * logged server-side and swallowed — alerting must never break lead capture.
 */
export async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) {
    console.warn("sendTelegramMessage: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set, skipping");
    return;
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });

  const data = await res.json();
  if (!res.ok || !data.ok) {
    throw new Error(`Telegram API error: ${JSON.stringify(data)}`);
  }
}
