// next.config.ts
import type { NextConfig } from "next";

const isProd = process.env.VERCEL_ENV === "production";

// Headers de segurança (HSTS só em produção)
const securityHeaders = [
  ...(isProd
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]
    : []),
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // bloqueia APIs que não usamos
  { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
];

const nextConfig: NextConfig = {
  // Não deixar o ESLint travar o build em produção (temporário)
  eslint: { ignoreDuringBuilds: true },

  // Não expor o header "X-Powered-By: Next.js"
  poweredByHeader: false,

  // Se (e só se) o build travar por erro de TypeScript, descomente:
  // typescript: { ignoreBuildErrors: true },

  // B1.4 — cache forte para assets estáticos
  async headers() {
    return [
      {
        // chunks/webpack/etc. servidos por Next
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // arquivos do /public: imagens, ícones e fontes (cache 1 ano)
        // ⬇️ IMPORTANTE: note o ponto antes das extensões
        source: "/:all*.(webp|avif|png|jpg|jpeg|svg|gif|ico|woff2|woff|ttf)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Segurança aplicável a todas as rotas
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // 🚦 Redirecionamentos canônicos (SEO/UX)
  async redirects() {
    return [
      // Antiga rota intermediária para notícias → lista principal
      {
        source: "/institucional/noticias",
        destination: "/noticias",
        permanent: true,
      },
      {
        source: "/institucional/noticias/",
        destination: "/noticias",
        permanent: true,
      },

      // Compatibilidade de link legado do COC → slug atual
      {
        source: "/diferenciais/coc",
        destination: "/diferenciais/sistema-coc",
        permanent: true,
      },
      {
        source: "/diferenciais/coc/",
        destination: "/diferenciais/sistema-coc",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
