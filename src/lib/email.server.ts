import { Resend } from "resend";

const apiKey = import.meta.env.RESEND_API_KEY ?? "";
const from = import.meta.env.RESEND_FROM_EMAIL ?? "";
const notificationRecipients = (import.meta.env.RESEND_NOTIFICATION_EMAIL ?? "")
  .split(",")
  .map((recipient) => recipient.trim())
  .filter(Boolean);

const hasResendConfig = Boolean(apiKey && from && notificationRecipients.length > 0);

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const formatText = (value?: string | null) => value?.trim() || "-";

const paragraph = (value?: string | null) => escapeHtml(formatText(value)).replace(/\n/g, "<br>");

const row = (label: string, value?: string | null) => `
  <tr>
    <td style="padding:6px 12px 6px 0;color:#5f6f73;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
    <td style="padding:6px 0;color:#16383f;">${paragraph(value)}</td>
  </tr>
`;

const sendNotification = async ({
  subject,
  html,
  text,
  replyTo,
}: {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}) => {
  if (!hasResendConfig) {
    console.warn("[resend] Notification skipped: RESEND_API_KEY, RESEND_FROM_EMAIL or RESEND_NOTIFICATION_EMAIL missing.");
    return;
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: notificationRecipients,
    replyTo,
    subject,
    html,
    text,
  });

  if (error) {
    throw new Error(error.message);
  }
};

export const sendContactNotification = async ({
  name,
  email,
  phone,
  message,
  adminUrl,
}: {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  adminUrl: string;
}) => {
  await sendNotification({
    subject: `Neue Kontaktanfrage von ${name}`,
    replyTo: email,
    text: [
      "Neue Kontaktanfrage",
      "",
      `Name: ${name}`,
      `E-Mail: ${email}`,
      `Telefon: ${formatText(phone)}`,
      "",
      "Nachricht:",
      message,
      "",
      `Admin: ${adminUrl}`,
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.55;color:#16383f;">
        <h1 style="font-size:22px;margin:0 0 16px;">Neue Kontaktanfrage</h1>
        <table style="border-collapse:collapse;margin-bottom:18px;">
          ${row("Name", name)}
          ${row("E-Mail", email)}
          ${row("Telefon", phone)}
        </table>
        <h2 style="font-size:16px;margin:0 0 8px;">Nachricht</h2>
        <div style="background:#f4f1ed;border:1px solid #e5ded6;border-radius:8px;padding:14px;margin-bottom:18px;">
          ${paragraph(message)}
        </div>
        <p><a href="${escapeHtml(adminUrl)}" style="color:#00667a;">Im Adminbereich öffnen</a></p>
      </div>
    `,
  });
};

export const sendApplicationNotification = async ({
  name,
  email,
  phone,
  coverText,
  jobTitle,
  resumeLinks,
  adminUrl,
}: {
  name: string;
  email: string;
  phone: string;
  coverText?: string | null;
  jobTitle?: string | null;
  resumeLinks: Array<{ path: string; signedUrl: string }>;
  adminUrl: string;
}) => {
  const fileText = resumeLinks.length
    ? resumeLinks.map((link, index) => `Datei ${index + 1}: ${link.signedUrl}`).join("\n")
    : "-";
  const fileHtml = resumeLinks.length
    ? `<ul>${resumeLinks.map((link, index) => `<li><a href="${escapeHtml(link.signedUrl)}">Datei ${index + 1}</a></li>`).join("")}</ul>`
    : "<p>-</p>";

  await sendNotification({
    subject: `Neue Bewerbung von ${name}`,
    replyTo: email,
    text: [
      "Neue Bewerbung",
      "",
      `Name: ${name}`,
      `E-Mail: ${email}`,
      `Telefon: ${phone}`,
      `Stelle: ${formatText(jobTitle)}`,
      "",
      "Bewerbungstext:",
      formatText(coverText),
      "",
      "Dateien:",
      fileText,
      "",
      "Die Datei-Links sind zeitlich begrenzt.",
      "",
      `Admin: ${adminUrl}`,
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.55;color:#16383f;">
        <h1 style="font-size:22px;margin:0 0 16px;">Neue Bewerbung</h1>
        <table style="border-collapse:collapse;margin-bottom:18px;">
          ${row("Name", name)}
          ${row("E-Mail", email)}
          ${row("Telefon", phone)}
          ${row("Stelle", jobTitle)}
        </table>
        <h2 style="font-size:16px;margin:0 0 8px;">Bewerbungstext</h2>
        <div style="background:#f4f1ed;border:1px solid #e5ded6;border-radius:8px;padding:14px;margin-bottom:18px;">
          ${paragraph(coverText)}
        </div>
        <h2 style="font-size:16px;margin:0 0 8px;">Dateien</h2>
        ${fileHtml}
        <p style="color:#5f6f73;font-size:13px;">Die Datei-Links sind zeitlich begrenzt.</p>
        <p><a href="${escapeHtml(adminUrl)}" style="color:#00667a;">Im Adminbereich öffnen</a></p>
      </div>
    `,
  });
};
