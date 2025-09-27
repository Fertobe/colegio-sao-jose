// app/institucional/noticias/page.tsx
import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Notícias — Redirecionando",
  description: "Redirecionando para a página de notícias do Colégio São José.",
  // Evita indexar esta rota intermediária
  robots: { index: false, follow: false },
  // Declara a canonical correta
  alternates: { canonical: "/noticias" },
};

// Precisa exportar um componente React (mesmo que nunca renderize)
export default function InstitucionalNoticiasPage() {
  permanentRedirect("/noticias"); // 308 permanente para a listagem real
  return null;
}
