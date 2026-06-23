import type { APIRoute } from "astro";
import { createResumeUploadTarget } from "@/lib/supabase.server";

export const prerender = false;

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });

const hasAllowedExtension = (filename: string) => {
  const lowerName = filename.toLowerCase();
  return ALLOWED_EXTENSIONS.some((extension) => lowerName.endsWith(extension));
};

export const POST: APIRoute = async ({ request }) => {
  let body: {
    filename?: string;
    size?: number;
  };

  try {
    body = await request.json();
  } catch {
    return json({ message: "Ungültige Anfrage." }, 400);
  }

  const filename = body.filename?.trim() ?? "";
  const size = Number(body.size ?? 0);

  if (!filename || !hasAllowedExtension(filename)) {
    return json({ message: "Bitte laden Sie nur PDF-, DOC- oder DOCX-Dateien hoch." }, 400);
  }

  if (!Number.isFinite(size) || size <= 0 || size > MAX_FILE_SIZE) {
    return json({ message: `"${filename}" ist zu groß (max. 20 MB).` }, 400);
  }

  try {
    const upload = await createResumeUploadTarget(filename);
    return json(upload);
  } catch (error) {
    const messageText = error instanceof Error && error.message === "Supabase is not configured."
      ? "Supabase ist noch nicht konfiguriert."
      : "Upload konnte nicht vorbereitet werden.";

    return json({ message: messageText }, 503);
  }
};
