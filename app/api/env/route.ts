// app/api/env/route.ts
export const dynamic = "force-dynamic"; // garante execução no server a cada chamada

function has(name: string) {
  const v = process.env[name];
  return typeof v === "string" && v.trim().length > 0;
}
function safe(v?: string) {
  return v ?? null;
}

export async function GET() {
  return Response.json({
    ok: true,
    env: {
      NODE_ENV: process.env.NODE_ENV ?? null,
      RESEND_API_KEY: has("RESEND_API_KEY"),      // true/false (não mostra o valor)
      MAIL_FROM: safe(process.env.MAIL_FROM),
      CONTACT_TO: safe(process.env.CONTACT_TO),
      APP_BASE_URL: safe(process.env.APP_BASE_URL),
      MAIL_SUBJECT_PREFIX: safe(process.env.MAIL_SUBJECT_PREFIX),
    },
  });
}
