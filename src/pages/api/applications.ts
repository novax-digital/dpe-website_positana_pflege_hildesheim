import type { APIRoute } from "astro";
import { sendApplicationNotification } from "@/lib/email.server";
import { createJobApplication, createResumeDownloadUrls, getJobListingById } from "@/lib/supabase.server";

export const prerender = false;

const MAX_FILES = 5;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const hasAllowedExtension = (path: string) => {
  const lowerPath = path.toLowerCase();
  return ALLOWED_EXTENSIONS.some((extension) => lowerPath.endsWith(extension));
};

const isValidResumePath = (path: string) => {
  return (
    path.startsWith("applications/") &&
    !path.includes("..") &&
    path.length <= 300 &&
    hasAllowedExtension(path)
  );
};

export const POST: APIRoute = async ({ request }) => {
  let body: {
    job_listing_id?: string;
    name?: string;
    phone?: string;
    email?: string;
    cover_text?: string;
    resume_paths?: string[];
  };

  try {
    body = await request.json();
  } catch {
    return json({ message: "Ungültige Anfrage." }, 400);
  }

  const name = body.name?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const coverText = body.cover_text?.trim() ?? "";
  const jobListingId = body.job_listing_id?.trim() ?? "";
  const resumePaths = Array.isArray(body.resume_paths)
    ? body.resume_paths.map((path) => path.trim()).filter(Boolean)
    : [];

  if (!name || !phone || !email) {
    return json({ message: "Bitte füllen Sie alle Pflichtfelder aus." }, 400);
  }

  if (!isEmail(email)) {
    return json({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." }, 400);
  }

  if (name.length > 100 || phone.length > 50 || email.length > 255 || coverText.length > 3000) {
    return json({ message: "Bitte kürzen Sie Ihre Eingaben." }, 400);
  }

  if (jobListingId && !UUID_RE.test(jobListingId)) {
    return json({ message: "Die gewählte Stelle ist ungültig." }, 400);
  }

  if (resumePaths.length > MAX_FILES) {
    return json({ message: `Bitte laden Sie maximal ${MAX_FILES} Dateien hoch.` }, 400);
  }

  for (const path of resumePaths) {
    if (!isValidResumePath(path)) {
      return json({ message: "Eine hochgeladene Datei ist ungültig." }, 400);
    }
  }

  try {
    await createJobApplication({
      job_listing_id: jobListingId || null,
      name,
      phone,
      email,
      cover_text: coverText || null,
      resume_url: resumePaths.length ? resumePaths.join(",") : null,
    });

    try {
      const [jobListing, resumeLinks] = await Promise.all([
        jobListingId ? getJobListingById(jobListingId) : Promise.resolve(null),
        createResumeDownloadUrls(resumePaths),
      ]);

      await sendApplicationNotification({
        name,
        phone,
        email,
        coverText: coverText || null,
        jobTitle: jobListing?.title ?? null,
        resumeLinks,
        adminUrl: new URL("/admin/applications", request.url).toString(),
      });
    } catch (notificationError) {
      console.warn(
        "[resend:application]",
        notificationError instanceof Error ? notificationError.message : notificationError,
      );
    }

    return json({ ok: true });
  } catch (error) {
    const messageText = error instanceof Error && error.message === "Supabase is not configured."
      ? "Supabase ist noch nicht konfiguriert."
      : "Bewerbung konnte nicht gesendet werden.";

    return json({ message: messageText }, 503);
  }
};
