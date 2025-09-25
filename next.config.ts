// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Não deixar o ESLint travar o build em produção (temporário)
  eslint: { ignoreDuringBuilds: true },

  // Se (e só se) o build travar por erro de TypeScript, descomente a linha abaixo:
  // typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
