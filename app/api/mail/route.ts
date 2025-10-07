// app/api/mail/route.ts
import { Resend } from "resend";

export const dynamic = "force-dynamic";

// ---------- util ----------
function reqEnv(name: string): string {
  const v = process.env[name];
  if (!v || v.trim() === "") throw new Error(`Faltou variável ${name}`);
  return v.trim();
}
function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ---------- GET: teste rápido ----------
export async function GET() {
  try {
    reqEnv("RESEND_API_KEY");
    reqEnv("MAIL_FROM");
    reqEnv("CONTACT_TO");
    return Response.json({ ok: true, route: "/api/mail", tip: "Use POST para enviar." });
  } catch (err: any) {
    return Response.json({ ok: false, error: String(err?.message || err) }, { status: 500 });
  }
}

// ---------- POST: envio ----------
type Body = {
  name: string;
  email: string;       // replyTo
  phone?: string;
  message: string;
  subject?: string;    // <- opcional (novo)
  meta?: Record<string, string | number | boolean | null | undefined>; // <- opcional (novo)
};

export async function POST(req: Request) {
  try {
    const RESEND_API_KEY = reqEnv("RESEND_API_KEY");
    const MAIL_FROM = reqEnv("MAIL_FROM");
    const CONTACT_TO = reqEnv("CONTACT_TO");
    const APP_BASE_URL = process.env.APP_BASE_URL ?? "";
    const PREFIX = process.env.MAIL_SUBJECT_PREFIX ?? "";

    const data = (await req.json()) as Partial<Body>;

    // validação básica
    if (!data?.name || !data?.email || !data?.message) {
      return Response.json(
        { ok: false, error: "Campos obrigatórios: name, email, message." },
        { status: 400 }
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    const subject =
      (data.subject && data.subject.trim()) ||
      `${PREFIX ? `${PREFIX} ` : ""}Contato via site — ${data.name}`;

    const metaLines =
      data.meta
        ? Object.entries(data.meta)
            .map(([k, v]) => `${k}: ${v ?? ""}`)
            .join("\n")
        : "";

    const text = [
      `Nome: ${data.name}`,
      `E-mail: ${data.email}`,
      data.phone ? `Telefone: ${data.phone}` : null,
      "",
      "Mensagem:",
      data.message,
      "",
      APP_BASE_URL ? `Origem: ${APP_BASE_URL}` : null,
      metaLines ? "\n-- Metadados --" : null,
      metaLines || null,
    ]
      .filter(Boolean)
      .join("\n");

    const htmlMeta = data.meta
      ? `<hr style="margin:16px 0;border:none;border-top:1px solid #eee"/>
         <p style="color:#666"><strong>Metadados</strong><br/>${Object.entries(data.meta)
           .map(([k, v]) => `${escapeHtml(k)}: ${escapeHtml(String(v ?? ""))}`)
           .join("<br/>")}</p>`
      : "";

    const html = `
      <div style="font-family: system-ui, Arial, sans-serif; line-height:1.6">
        <h2>${escapeHtml(subject)}</h2>
        <ul>
          <li><strong>Nome:</strong> ${escapeHtml(data.name)}</li>
          <li><strong>E-mail:</strong> ${escapeHtml(data.email)}</li>
          ${data.phone ? `<li><strong>Telefone:</strong> ${escapeHtml(data.phone)}</li>` : ""}
        </ul>
        <p><strong>Mensagem:</strong></p>
        <pre style="white-space:pre-wrap">${escapeHtml(data.message)}</pre>
        ${APP_BASE_URL ? `<p style="color:#666">Origem: ${escapeHtml(APP_BASE_URL)}</p>` : ""}
        ${htmlMeta}
      </div>
    `;

    const sent = await resend.emails.send({
      from: MAIL_FROM,
      to: CONTACT_TO,
      replyTo: data.email,
      subject,
      text,
      html,
    });

    if (sent.error) {
      return Response.json({ ok: false, error: sent.error.message }, { status: 502 });
    }

    return Response.json({ ok: true, id: sent.data?.id || null });
  } catch (err: any) {
    return Response.json(
      { ok: false, error: String(err?.message || err) },
      { status: 500 }
    );
  }
}
