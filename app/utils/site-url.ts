// app/utils/site-url.ts
// Blindagem do SITE_URL por ambiente (Production/Preview/Dev)
const raw =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

// Normaliza removendo barras finais
export function getSiteUrl() {
  return raw.replace(/\/+$/, "");
}

// Alerta leve em produção se configurar algo estranho
export function assertSiteUrlForEnv() {
  if (process.env.NODE_ENV !== "production") return;
  try {
    const u = new URL(getSiteUrl());
    if (u.protocol !== "https:") {
      // eslint-disable-next-line no-console
      console.warn("[SEO] NEXT_PUBLIC_SITE_URL deveria ser HTTPS em produção:", u.href);
    }
  } catch {
    // eslint-disable-next-line no-console
    console.warn("[SEO] NEXT_PUBLIC_SITE_URL inválida. Ajuste nas variáveis de ambiente.");
  }
}
