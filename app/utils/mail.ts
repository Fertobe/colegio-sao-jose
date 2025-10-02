// app/utils/mail.ts
/**
 * Envia e-mail via Resend API (sem libs). Se não houver RESEND_API_KEY,
 * faz fallback para console.log (não quebra o build).
 */
export type MailInput = {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
};

export async function sendMail({ to, subject, text, html, from }: MailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const toList = Array.isArray(to) ? to : [to];

  const fromDefault =
    process.env.CONTACT_FROM_EMAIL || "no-reply@colegio.artferro.site";
  const fromEmail = from || fromDefault;

  if (!apiKey) {
    console.log("[sendMail:fallback] Sem RESEND_API_KEY — logando payload:");
    console.log({ to: toList, subject, text, html, from: fromEmail });
    return { id: "dev-fallback" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: toList,
      subject,
      text,
      html,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error("[sendMail] erro:", data);
    throw new Error(
      data?.message || `Falha ao enviar e-mail (HTTP ${res.status})`
    );
  }
  return data as { id: string };
}
