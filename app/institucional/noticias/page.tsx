// app/institucional/noticias/page.tsx
import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

// Garante que o redirect execute no servidor (e não vire HTML estático)
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Notícias — redirecionando | Colégio São José",
  description: "Redirecionando para a página de notícias do Colégio São José.",
  // Evita indexar esta rota intermediária
  robots: { index: false, follow: false },
  // Canonical aponta para o destino correto
  alternates: { canonical: "/noticias" },
};

// Não renderiza nada — responde 308 imediatamente
export default function InstitucionalNoticiasPage() {
  permanentRedirect("/noticias");
}
