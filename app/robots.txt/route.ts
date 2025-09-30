// app/robots.txt/route.ts
const SITE_URL = "https://colegio.artferro.site";

export const dynamic = "force-static";

export async function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
  ].join("\n");

  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
