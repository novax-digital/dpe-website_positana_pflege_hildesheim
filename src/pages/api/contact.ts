import type { APIRoute } from "astro";
import { createContactMessage } from "@/lib/supabase.server";

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const POST: APIRoute = async ({ request }) => {
  let body: {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    website?: string;
  };

  try {
    body = await request.json();
  } catch {
    return json({ message: "Ungültige Anfrage." }, 400);
  }

  if (body.website) {
    return json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return json({ message: "Bitte füllen Sie alle Pflichtfelder aus." }, 400);
  }

  if (!isEmail(email)) {
    return json({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." }, 400);
  }

  if (name.length > 100 || email.length > 255 || phone.length > 50 || message.length > 2000) {
    return json({ message: "Bitte kürzen Sie Ihre Eingaben." }, 400);
  }

  try {
    await createContactMessage({
      name,
      email,
      phone: phone || null,
      message,
    });

    return json({ ok: true });
  } catch (error) {
    const messageText = error instanceof Error && error.message === "Supabase is not configured."
      ? "Supabase ist noch nicht konfiguriert."
      : "Nachricht konnte nicht gesendet werden.";

    return json({ message: messageText }, 503);
  }
};
