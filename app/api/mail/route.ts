// app/api/mail/route.ts
import { Resend } from "resend";

export const dynamic = "force-dynamic"; // sempre executa no server

// ---------- util ----------
function reqEnv(name: string): string {
  const v = process.env[name];
  if (!v || v.trim() === "") throw new Error(`Faltou variável ${name}`);
  return v.trim();
}

// ---------- GET: só para teste rápido no navegador ----------
export async function GET() {
  try {
    // tenta ler as variáveis (se faltar, cai no catch)
    reqEnv("RESEND_API_KEY");
    reqEnv("MAIL_FROM");
    reqEnv("CONTACT_TO");

    return Response.json({ ok: true, route: "/api/mail", tip: "Use POST para enviar." });
  } catch (err: any) {
    return Response.json({ ok: false, error: String(err?.message || err) }, { status: 500 });
  }
}

// ---------- POST: envio de e-mail ----------
type Body = {
  name: string;
  email: string;       // usado em replyTo
  phone?: string;
  message: string;
};

export async function POST(req: Request) {
  try {
    const RESEND_API_KEY = reqEnv("RESEND_API_KEY");
    const MAIL_FROM = reqEnv("MAIL_FROM");
    const CONTACT_TO = reqEnv("CONTACT_TO");
    const APP_BASE_URL = process.env.APP_BASE_URL ?? "";
    const PREFIX = process.env.MAIL_SUBJECT_PREFIX ?? "";

    const data = (await req.json()) as Partial<Body>;

    // validação bem simples
    if (!data?.name || !data?.email || !data?.message) {
      return Response.json(
        { ok: false, error: "Campos obrigatórios: name, email, message." },
        { status: 400 }
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    const subject = `${PREFIX ? `${PREFIX} ` : ""}Contato via site — ${data.name}`;
    const text =
      [
        `Nome: ${data.name}`,
        `E-mail: ${data.email}`,
        data.phone ? `Telefone: ${data.phone}` : null,
        "",
        data.message,
        "",
        APP_BASE_URL ? `Origem: ${APP_BASE_URL}` : null,
      ]
        .filter(Boolean)
        .join("\n");

    const html = `
      <div style="font-family: system-ui, Arial, sans-serif; line-height:1.6">
        <h2>Contato via site</h2>
        <ul>
          <li><strong>Nome:</strong> ${escapeHtml(data.name)}</li>
          <li><strong>E-mail:</strong> ${escapeHtml(data.email)}</li>
          ${data.phone ? `<li><strong>Telefone:</strong> ${escapeHtml(data.phone)}</li>` : ""}
        </ul>
        <p><strong>Mensagem:</strong></p>
        <pre style="white-space:pre-wrap">${escapeHtml(data.message)}</pre>
        ${APP_BASE_URL ? `<p style="color:#666">Origem: ${escapeHtml(APP_BASE_URL)}</p>` : ""}
      </div>
    `;

    const sent = await resend.emails.send({
      from: MAIL_FROM,         // ex.: "Colégio São José <onboarding@resend.dev>"
      to: CONTACT_TO,          // seu destino de testes (Gmail)
      replyTo: data.email,     // <<< atenção: 'replyTo' é string, não objeto
      subject,
      text,
      html,
    });

    if (sent.error) {
      // Resend retornou erro
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

// pequeno escape para o HTML
function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
