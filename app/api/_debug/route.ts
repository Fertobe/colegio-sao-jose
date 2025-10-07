// app/api/_debug/env/route.ts
export const dynamic = "force-dynamic"; // garante execução no servidor a cada chamada

function has(name: string) {
  const v = process.env[name];
  return typeof v === "string" && v.trim().length > 0;
}

export async function GET() {
  return Response.json({
    ok: true,
    env: {
      NODE_ENV: process.env.NODE_ENV ?? null,
      RESEND_API_KEY: has("RESEND_API_KEY"),      // true/false (não expõe o valor)
      MAIL_FROM: process.env.MAIL_FROM ?? null,
      CONTACT_TO: process.env.CONTACT_TO ?? null,
      APP_BASE_URL: process.env.APP_BASE_URL ?? null,
      MAIL_SUBJECT_PREFIX: process.env.MAIL_SUBJECT_PREFIX ?? null,
    },
  });
}
