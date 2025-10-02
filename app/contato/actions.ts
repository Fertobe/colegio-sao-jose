// app/contato/actions.ts
"use server";

import { sendMail } from "@/app/utils/mail";

export type ContatoState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<"nome" | "email" | "telefone" | "mensagem", string>>;
};

const MIN_DWELL_MS = 1200; // tempo mínimo na página p/ evitar bot

function isEmail(s?: string) {
  if (!s) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}
function clean(s: any) {
  return typeof s === "string" ? s.trim() : "";
}

export async function enviarContato(
  _prev: ContatoState,
  formData: FormData
): Promise<ContatoState> {
  // Honeypot: robots preenchem "website"
  const website = clean(formData.get("website"));
  if (website) return { ok: true, message: "Recebido. Obrigado!" };

  // Tempo mínimo (dwell time)
  const tstart = Number(formData.get("tstart") || 0);
  if (tstart && Date.now() - tstart < MIN_DWELL_MS) {
    return { ok: true, message: "Recebido. Obrigado!" };
  }

  const nome = clean(formData.get("nome"));
  const email = clean(formData.get("email"));
  const telefone = clean(formData.get("telefone"));
  const mensagem = clean(formData.get("mensagem"));

  const errors: ContatoState["errors"] = {};
  if (!nome) errors.nome = "Informe seu nome.";
  if (!email || !isEmail(email)) errors.email = "Informe um e-mail válido.";
  if (!telefone) errors.telefone = "Informe um telefone.";
  if (!mensagem || mensagem.length < 5) errors.mensagem = "Escreva sua mensagem.";

  if (Object.keys(errors).length) {
    return { ok: false, message: "Corrija os campos em destaque.", errors };
  }

  const TO = process.env.CONTACT_TO_EMAIL;
  const FROM =
    process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev"; // seguro p/ testes com Resend

  if (!TO) {
    return {
      ok: false,
      message:
        "Contato indisponível no momento (CONTACT_TO_EMAIL não configurado).",
    };
  }

  const subject = `Novo contato — ${nome} <${email}>`;
  const text = [
    `Nome: ${nome}`,
    `E-mail: ${email}`,
    `Telefone: ${telefone}`,
    "",
    "Mensagem:",
    mensagem,
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5">
      <h2 style="margin:0 0 12px 0">Novo contato do site</h2>
      <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Telefone:</strong> ${escapeHtml(telefone)}</p>
      <pre style="white-space:pre-wrap;margin-top:16px">${escapeHtml(mensagem)}</pre>
    </div>
  `.trim();

  try {
    await sendMail({
      to: TO,
      from: FROM,
      subject,
      text,
      html,
    });
    return { ok: true, message: "Mensagem enviada com sucesso. Obrigado!" };
  } catch (err: any) {
    return {
      ok: false,
      message: `Falha ao enviar: ${err?.message || "erro desconhecido"}`,
    };
  }
}

function escapeHtml(s: string) {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
