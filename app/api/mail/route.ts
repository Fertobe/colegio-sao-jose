// app/api/mail/route.ts
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  page?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    const name = (body.name || "").toString().slice(0, 120);
    const email = (body.email || "").toString().slice(0, 160);
    const phone = (body.phone || "").toString().slice(0, 60);
    const subject =
      `${process.env.MAIL_SUBJECT_PREFIX ?? "[Site]"} ` +
      (body.subject?.toString().slice(0, 160) || "Novo contato");
    const message = (body.message || "").toString().slice(0, 5000);
    const page = (body.page || "").toString().slice(0, 240);

    if (!message && !email && !phone) {
      return NextResponse.json({ ok: false, error: "Nada para enviar." }, { status: 400 });
    }

    const to = process.env.MAIL_TO!; // seu Gmail por enquanto
    const from = process.env.MAIL_FROM || "Colégio São José <onboarding@resend.dev>";

    const text = [
      name && `Nome: ${name}`,
      email && `E-mail: ${email}`,
      phone && `Telefone: ${phone}`,
      page && `Origem: ${page}`,
      "",
      "Mensagem:",
      message || "(sem mensagem)",
    ].filter(Boolean).join("\n");

    const html = `
      <div style="font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif;font-size:16px;line-height:1.6">
        ${name ? `<p><b>Nome:</b> ${escapeHtml(name)}</p>` : ""}
        ${email ? `<p><b>E-mail:</b> ${escapeHtml(email)}</p>` : ""}
        ${phone ? `<p><b>Telefone:</b> ${escapeHtml(phone)}</p>` : ""}
        ${page ? `<p><b>Origem:</b> ${escapeHtml(page)}</p>` : ""}
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
        <p style="white-space:pre-wrap">${escapeHtml(message || "(sem mensagem)")}</p>
      </div>
    `;

    // valida e, se ok, usa como replyTo (string)
    const replyToEmail =
      email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : undefined;

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
      html,
      ...(replyToEmail ? { replyTo: replyToEmail } : {}),
    });

    if (error) return NextResponse.json({ ok: false, error }, { status: 500 });
    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message ?? "Erro" }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
