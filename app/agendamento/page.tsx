// app/agendamento/page.tsx
import type { Metadata } from "next";
import AgendamentoClient from "./AgendamentoClient.tsx"; // ⬅️ força a resolução

export const metadata: Metadata = {
  title: "Agendamento de Visita | Colégio São José",
  description:
    "Agende sua visita ao Colégio São José. Informe seus dados e o segmento de interesse.",
  alternates: { canonical: "/agendamento" },
  openGraph: {
    type: "website",
    title: "Agendamento de Visita | Colégio São José",
    description:
      "Agende sua visita ao Colégio São José. Informe seus dados e o segmento de interesse.",
    images: ["/og-cover.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agendamento de Visita | Colégio São José",
    description:
      "Agende sua visita ao Colégio São José. Informe seus dados e o segmento de interesse.",
  },
};

export default function AgendamentoPage() {
  return <AgendamentoClient />;
}
