// app/contato/actions.ts
"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

export type ContatoState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<"nome" | "email" | "telefone" | "mensagem", string>>;
};

const MIN_DWELL_MS = 1200;

// ---------- helpers ----------
function isEmail(s?: string) {
  if (!s) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}
function clean(s: unknown) {
  return typeof s === "string" ? s.trim() : "";
}
function limit(s: string, n: number) {
  return s.length > n ? s.slice(0, n) : s;
}
function sanitizeHeader(s: string) {
  return s.replace(/[\r\n]+/g, " ").trim();
}
function escapeHtml(s: string) {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function reqEnv(name: string): string {
  const v = process.env[name];
  if (!v || !v.trim()) throw new Error(`Faltou variável ${name}`);
  return v.trim();
}

// Aceita PT (nome/telefone/mensagem) e EN (name/phone/message)
export async function enviarContato(
  _prev: ContatoState,
  formData: FormData
): Promise<ContatoState> {
  // Honeypot
  const website = clean(formData.get("website"));
  if (website) return { ok: true, message: "Recebido. Obrigado!" };

  // Tempo mínimo na página
  const tstart = Number(formData.get("tstart") || 0);
  if (tstart && Date.now() - tstart < MIN_DWELL_MS) {
    return { ok: true, message: "Recebido. Obrigado!" };
  }

  // Campos (suporta PT/EN)
  const nome = limit(clean(formData.get("nome") ?? formData.get("name")), 120);
  const email = limit(clean(formData.get("email")).toLowerCase(), 160);
  const telefone = limit(clean(formData.get("telefone") ?? formData.get("phone")), 40);
  const mensagem = limit(clean(formData.get("mensagem") ?? formData.get("message")), 4000);

  // Validação
  const errors: ContatoState["errors"] = {};
  if (!nome) errors.nome = "Informe seu nome.";
  if (!email || !isEmail(email)) errors.email = "Informe um e-mail válido.";
  if (!mensagem || mensagem.length < 5) errors.mensagem = "Escreva sua mensagem.";

  if (Object.keys(errors).length) {
    return { ok: false, message: "Corrija os campos em destaque.", errors };
  }

  // Variáveis (mesmo padrão do /api/mail)
  let RESEND_API_KEY = "";
  let MAIL_FROM = "";
  let CONTACT_TO = "";
  try {
    RESEND_API_KEY = reqEnv("RESEND_API_KEY");
    MAIL_FROM = reqEnv("MAIL_FROM");
    CONTACT_TO = reqEnv("CONTACT_TO");
  } catch (e: any) {
    return { ok: false, message: `Configuração ausente: ${e?.message || e}` };
  }

  // Metadados de request
  let ua = "", ip = "", referer = "";
  try {
    const hdrs = await headers();
    ua = hdrs.get("user-agent") ?? "";
    const xff = hdrs.get("x-forwarded-for") ?? "";
    ip = xff.split(",")[0]?.trim() || hdrs.get("x-real-ip") || "";
    referer = hdrs.get("referer") ?? "";
  } catch {
    // segue sem metadados
  }

  const subjectRaw = `Contato via site — ${nome}`;
  const subject = sanitizeHeader(limit(subjectRaw, 160));

  const text = [
    `Nome: ${nome}`,
    `E-mail: ${email}`,
    telefone ? `Telefone: ${telefone}` : null,
    "",
    "Mensagem:",
    mensagem,
    "",
    "-- Metadados --",
    ip ? `IP: ${ip}` : null,
    ua ? `User-Agent: ${ua}` : null,
    referer ? `Referer: ${referer}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5">
      <h2 style="margin:0 0 12px 0">Contato via site</h2>
      <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      ${telefone ? `<p><strong>Telefone:</strong> ${escapeHtml(telefone)}</p>` : ""}
      <pre style="white-space:pre-wrap;margin-top:16px">${escapeHtml(mensagem)}</pre>
      <hr style="margin:16px 0;border:none;border-top:1px solid #eee"/>
      <p style="color:#666;font-size:12px">
        ${ip ? `<strong>IP:</strong> ${escapeHtml(ip)}<br/>` : ""}
        ${ua ? `<strong>User-Agent:</strong> ${escapeHtml(ua)}<br/>` : ""}
        ${referer ? `<strong>Referer:</strong> ${escapeHtml(referer)}` : ""}
      </p>
    </div>
  `.trim();

  try {
    const resend = new Resend(RESEND_API_KEY);
    const result = await resend.emails.send({
      from: MAIL_FROM,     // ex.: "Colégio São José <onboarding@resend.dev>"
      to: CONTACT_TO,      // seu gmail de testes (ou o do colégio)
      replyTo: email,      // responder cai no e-mail do visitante
      subject,
      text,
      html,
    });

    if (result.error) {
      return { ok: false, message: `Falha no envio: ${result.error.message}` };
    }
    return { ok: true, message: "Mensagem enviada com sucesso. Obrigado!" };
  } catch (err: any) {
    return { ok: false, message: `Erro ao enviar: ${err?.message || "desconhecido"}` };
  }
}
