// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Não deixar o ESLint travar o build em produção (temporário)
  eslint: { ignoreDuringBuilds: true },

  // Se (e só se) o build travar por erro de TypeScript, descomente a linha abaixo:
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
        // arquivos do /public: imagens, ícones e fontes
        // (cache de 1 ano; seguro pq nomes são estáveis)
        // ⬇️ IMPORTANTE: note o ponto antes das extensões
        source: "/:all*.(webp|avif|png|jpg|jpeg|svg|gif|ico|woff2|woff|ttf)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
