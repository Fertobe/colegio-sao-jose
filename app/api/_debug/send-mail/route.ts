// app/api/_debug/send-mail/route.ts
import { Resend } from "resend";

export const dynamic = "force-dynamic"; // garante execução sempre no servidor

function missingEnv(...keys: string[]) {
  return keys.filter((k) => !process.env[k] || !String(process.env[k]).trim());
}

export async function GET() {
  // garanta que essas variáveis estão configuradas na Vercel (Production)
  const required = ["RESEND_API_KEY", "MAIL_FROM", "CONTACT_TO", "APP_BASE_URL"];
  const missing = missingEnv(...required);
  if (missing.length) {
    return Response.json(
      { ok: false, error: `Faltam variáveis: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY!);

  try {
    const subjectPrefix = process.env.MAIL_SUBJECT_PREFIX?.trim() ?? "";
    const subject =
      `${subjectPrefix ? `${subjectPrefix} ` : ""}[DEBUG] Envio de teste`; // ex: “[Site CSJ] [DEBUG] Envio de teste”

    const { data, error } = await resend.emails.send({
      from: process.env.MAIL_FROM!,           // ex: "Colégio São José <onboarding@resend.dev>"
      to: process.env.CONTACT_TO!,            // pra onde o teste vai cair
      replyTo: process.env.CONTACT_TO!,       // opcional; pode remover se quiser
      subject,
      text:
        `Teste simples do endpoint /api/_debug/send-mail\n\n` +
        `URL base: ${process.env.APP_BASE_URL}\n` +
        `Se este e-mail chegou, a integração com a Resend está OK.`
    });

    if (error) {
      return Response.json({ ok: false, error }, { status: 500 });
    }

    return Response.json({ ok: true, id: data?.id ?? null });
  } catch (e: any) {
    return Response.json({ ok: false, error: String(e?.message ?? e) }, { status: 500 });
  }
}
