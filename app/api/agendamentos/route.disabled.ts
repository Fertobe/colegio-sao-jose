// app/api/agendamentos/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Garante Node runtime (nodemailer não funciona no Edge)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Tipagem simples do payload
type AgendamentoPayload = {
  unidade: string;
  endereco: string;
  responsavel: { nome: string; telefone: string; email: string };
  aluno: { nome: string; serie?: string };
  mensagem?: string;
  origem?: string;
  quando?: string;
};

// util p/ escapar HTML
function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    const ctype = req.headers.get("content-type") || "";
    if (!ctype.includes("application/json")) {
      return NextResponse.json({ ok: false, error: "Unsupported Media Type" }, { status: 415 });
    }

    const data = (await req.json()) as Partial<AgendamentoPayload>;

    // ===== Validação básica =====
    const nomeResp = data?.responsavel?.nome?.trim();
    const telResp = data?.responsavel?.telefone?.trim();
    const emailResp = data?.responsavel?.email?.trim();
    const nomeAluno = data?.aluno?.nome?.trim();

    if (!nomeResp || !telResp || !emailResp || !nomeAluno) {
      return NextResponse.json(
        { ok: false, error: "Campos obrigatórios ausentes." },
        { status: 400 }
      );
    }

    // Log no servidor (sempre)
    console.log("[AGENDAMENTO]", data);

    // ===== Envio de e-mail (opcional) =====
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      AGENDAMENTO_TO,
      AGENDAMENTO_FROM,
    } = process.env;

    if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && AGENDAMENTO_TO && AGENDAMENTO_FROM) {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });

      // Conteúdos sanetizados
      const html = `
        <h2>Novo Agendamento</h2>
        <p><b>Unidade:</b> ${esc(data.unidade)}</p>
        <p><b>Endereço:</b> ${esc(data.endereco)}</p>
        <hr/>
        <p><b>Responsável:</b> ${esc(nomeResp)}</p>
        <p><b>Telefone:</b> ${esc(telResp)}</p>
        <p><b>E-mail:</b> ${esc(emailResp)}</p>
        <hr/>
        <p><b>Aluno:</b> ${esc(nomeAluno)}</p>
        <p><b>Série/Idade:</b> ${esc(data?.aluno?.serie || "-")}</p>
        <p><b>Observações:</b> ${esc(data?.mensagem || "-")}</p>
        <hr/>
        <p><i>Origem:</i> ${esc(data?.origem || "site-agendamento")} — ${esc(
        data?.quando || new Date().toISOString()
      )}</p>
      `;

      const text =
        `Novo Agendamento\n\n` +
        `Unidade: ${data.unidade}\n` +
        `Endereço: ${data.endereco}\n\n` +
        `Responsável: ${nomeResp}\n` +
        `Telefone: ${telResp}\n` +
        `E-mail: ${emailResp}\n\n` +
        `Aluno: ${nomeAluno}\n` +
        `Série/Idade: ${data?.aluno?.serie || "-"}\n` +
        `Observações: ${data?.mensagem || "-"}\n\n` +
        `Origem: ${data?.origem || "site-agendamento"} — ${data?.quando || new Date().toISOString()}`;

      await transporter.sendMail({
        from: AGENDAMENTO_FROM, // pode usar `"Site – Agendamentos" <email@dominio>`
        to: AGENDAMENTO_TO,
        replyTo: emailResp, // facilita responder ao responsável
        subject: `Agendamento – ${nomeAluno}`,
        html,
        text,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[AGENDAMENTO][ERRO]", err);
    return NextResponse.json({ ok: false, error: "Erro interno" }, { status: 500 });
  }
}
