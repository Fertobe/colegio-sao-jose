// app/api/mail/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Garante Node.js runtime (Resend não precisa de Edge)
export const runtime = "nodejs";

// Se quiser impedir cache em edge/CDN
export const dynamic = "force-dynamic";

/* ----------------------- Utils ----------------------- */

// aceita string | undefined para acabar com os erros do TS
function escapeHtml(str?: string) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  // quaisquer outros campos do formulário:
  [key: string]: unknown;
};

function renderText(data: ContactPayload) {
  const lines: string[] = [];
  if (data.name) lines.push(`Nome: ${data.name}`);
  if (data.email) lines.push(`E-mail: ${data.email}`);
  if (data.phone) lines.push(`Telefone: ${data.phone}`);
  if (data.subject) lines.push(`Assunto: ${data.subject}`);
  if (data.message) {
    lines.push("");
    lines.push("Mensagem:");
    lines.push(String(data.message));
  }
  return lines.join("\n");
}

function renderHtml(data: ContactPayload) {
  return `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:14px;line-height:1.6;color:#111">
      <h2 style="margin:0 0 12px 0">Novo contato pelo site</h2>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        <tbody>
          ${data.name ? `<tr><td style="padding:6px 8px;background:#f8fafc;width:160px">Nome</td><td style="padding:6px 8px">${escapeHtml(data.name)}</td></tr>` : ""}
          ${data.email ? `<tr><td style="padding:6px 8px;background:#f8fafc">E-mail</td><td style="padding:6px 8px">${escapeHtml(data.email)}</td></tr>` : ""}
          ${data.phone ? `<tr><td style="padding:6px 8px;background:#f8fafc">Telefone</td><td style="padding:6px 8px">${escapeHtml(data.phone)}</td></tr>` : ""}
          ${data.subject ? `<tr><td style="padding:6px 8px;background:#f8fafc">Assunto</td><td style="padding:6px 8px">${escapeHtml(data.subject)}</td></tr>` : ""}
        </tbody>
      </table>

      ${
        data.message
          ? `<div style="margin-top:12px;padding:10px 12px;border:1px solid #e5e7eb;border-radius:8px;background:#fafafa">
               <div style="font-weight:600;margin-bottom:6px">Mensagem</div>
               <div style="white-space:pre-wrap">${escapeHtml(String(data.message))}</div>
             </div>`
          : ""
      }
    </div>
  `;
}

/* ----------------------- Handler ----------------------- */

export async function POST(req: Request) {
  try {
    // 1) Corpo
    let data: ContactPayload = {};
    try {
      data = (await req.json()) as ContactPayload;
    } catch {
      return NextResponse.json(
        { ok: false, error: "JSON inválido." },
        { status: 400 }
      );
    }

    // 2) Envs obrigatórias (fazendo narrowing para string)
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "Faltou RESEND_API_KEY na Vercel." },
        { status: 500 }
      );
    }

    // prioriza CONTACT_TO; se não houver, tenta MAIL_TO
    const toEnv = process.env.CONTACT_TO || process.env.MAIL_TO;
    if (!toEnv) {
      return NextResponse.json(
        { ok: false, error: "Defina CONTACT_TO (ou MAIL_TO) na Vercel." },
        { status: 500 }
      );
    }
    const to: string = toEnv;

    // remetente padrão; você pode colocar 'Colégio São José <seu@dominio>'
    const from: string =
      process.env.MAIL_FROM || "Colégio São José <onboarding@resend.dev>";

    const prefix = (process.env.MAIL_SUBJECT_PREFIX ?? "[Site]").trim();
    const subjectUser =
      typeof data.subject === "string" && data.subject.trim()
        ? data.subject.trim()
        : "Novo contato pelo site";
    const subject = `${prefix} ${subjectUser}`.trim();

    const replyTo =
      typeof data.email === "string" && data.email.includes("@")
        ? data.email.trim()
        : undefined;

    // 3) Construir payload do e-mail
    const resend = new Resend(apiKey); // construído só aqui (evita erro no build)

    const payload = {
      from,
      to,
      subject,
      text: renderText(data),
      html: renderHtml(data),
      ...(replyTo ? { replyTo } : {}), // replyTo precisa ser string | string[]
    } as const;

    // 4) Enviar
    const result = await resend.emails.send(payload);

    if ((result as any)?.error) {
      // Resend pode devolver { error: { message } }
      const msg = (result as any).error?.message ?? "Falha ao enviar e-mail.";
      return NextResponse.json({ ok: false, error: msg }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("MAIL API ERROR:", err);
    const msg =
      err instanceof Error ? err.message : "Erro inesperado no envio de e-mail.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

// (opcional) simples health-check
export async function GET() {
  return NextResponse.json({ ok: true });
}
