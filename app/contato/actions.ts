// app/contato/actions.ts
"use server";

import { headers } from "next/headers";
import { sendMail } from "@/app/utils/mail";

export type ContatoState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<"nome" | "email" | "telefone" | "mensagem", string>>;
};

const MIN_DWELL_MS = 1200;

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

export async function enviarContato(
  _prev: ContatoState,
  formData: FormData
): Promise<ContatoState> {
  const website = clean(formData.get("website"));
  if (website) return { ok: true, message: "Recebido. Obrigado!" };

  const tstart = Number(formData.get("tstart") || 0);
  if (tstart && Date.now() - tstart < MIN_DWELL_MS) {
    return { ok: true, message: "Recebido. Obrigado!" };
  }

  const nome = limit(clean(formData.get("nome")), 120);
  const email = limit(clean(formData.get("email")).toLowerCase(), 160);
  const telefone = limit(clean(formData.get("telefone")), 40);
  const mensagem = limit(clean(formData.get("mensagem")), 4000);

  const errors: ContatoState["errors"] = {};
  if (!nome) errors.nome = "Informe seu nome.";
  if (!email || !isEmail(email)) errors.email = "Informe um e-mail válido.";
  if (!telefone) errors.telefone = "Informe um telefone.";
  if (!mensagem || mensagem.length < 5) errors.mensagem = "Escreva sua mensagem.";

  if (Object.keys(errors).length) {
    return { ok: false, message: "Corrija os campos em destaque.", errors };
  }

  const TO = String(process.env.CONTACT_TO_EMAIL || "").trim();
  const FROM = String(process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev").trim();

  if (!TO) {
    return {
      ok: false,
      message: "Contato indisponível no momento (CONTACT_TO_EMAIL não configurado).",
    };
  }

  // ⬇️ headers() agora é assíncrono no Next 15
  let ua = "", ip = "", referer = "";
  try {
    const hdrs = await headers();
    ua = hdrs.get("user-agent") ?? "";
    const xff = hdrs.get("x-forwarded-for") ?? "";
    ip = xff.split(",")[0]?.trim() || hdrs.get("x-real-ip") || "";
    referer = hdrs.get("referer") ?? "";
  } catch {
    // segue sem metadados se não disponível
  }

  const subjectRaw = `Novo contato — ${nome} <${email}>`;
  const subject = sanitizeHeader(limit(subjectRaw, 160));

  const text = [
    `Nome: ${nome}`,
    `E-mail: ${email}`,
    `Telefone: ${telefone}`,
    "",
    "Mensagem:",
    mensagem,
    "",
    "-- Metadados --",
    `IP: ${ip}`,
    `User-Agent: ${ua}`,
    `Referer: ${referer}`,
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5">
      <h2 style="margin:0 0 12px 0">Novo contato do site</h2>
      <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Telefone:</strong> ${escapeHtml(telefone)}</p>
      <pre style="white-space:pre-wrap;margin-top:16px">${escapeHtml(mensagem)}</pre>
      <hr style="margin:16px 0;border:none;border-top:1px solid #eee"/>
      <p style="color:#666;font-size:12px">
        <strong>IP:</strong> ${escapeHtml(ip)}<br/>
        <strong>User-Agent:</strong> ${escapeHtml(ua)}<br/>
        <strong>Referer:</strong> ${escapeHtml(referer)}
      </p>
    </div>
  `.trim();

  try {
    await sendMail({ to: TO, from: FROM, subject, text, html } as any);
    return { ok: true, message: "Mensagem enviada com sucesso. Obrigado!" };
  } catch (err: any) {
    return { ok: false, message: `Falha ao enviar: ${err?.message || "erro desconhecido"}` };
  }
}

function escapeHtml(s: string) {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
