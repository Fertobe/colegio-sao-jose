// app/agendamento/page.tsx
import type { Metadata } from "next";
import NextDynamic from "next/dynamic"; // ⬅️ renomeado para evitar conflito
import { getSiteUrl } from "@/app/utils/site-url";

// Mantém a página estática; o formulário roda no client
export const dynamic = "force-static";

const SITE_URL = getSiteUrl();

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
    url: `${SITE_URL}/agendamento`,
    images: [`${SITE_URL}/og-cover.webp`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agendamento de Visita | Colégio São José",
    description:
      "Agende sua visita ao Colégio São José. Informe seus dados e o segmento de interesse.",
    images: [`${SITE_URL}/og-cover.webp`],
  },
};

// Import dinâmico do client component (sem SSR)
const AgendamentoClient = NextDynamic(() => import("./AgendamentoClient"), {
  ssr: false,
  loading: () => (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <div className="h-6 w-40 rounded bg-gray-200" />
      <div className="mt-6 h-48 rounded-2xl border border-gray-200" />
    </main>
  ),
});

export default function AgendamentoPage() {
  // JSON-LD: migalhas (Home > Agendamento)
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Agendamento", item: `${SITE_URL}/agendamento` },
    ],
  };

  // JSON-LD: HowTo simples para o fluxo de agendamento
  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Como agendar uma visita ao Colégio São José",
    description:
      "Passo a passo para solicitar e confirmar sua visita ao Colégio São José.",
    step: [
      { "@type": "HowToStep", name: "Preencha seus dados", text: "Informe nome, contato e o segmento de interesse no formulário." },
      { "@type": "HowToStep", name: "Escolha dia/horário", text: "Selecione a data disponível que melhor se encaixa na sua agenda." },
      { "@type": "HowToStep", name: "Confirmação", text: "Você receberá a confirmação por WhatsApp ou e-mail com as instruções." },
      { "@type": "HowToStep", name: "Visite o colégio", text: "Compareça no horário combinado para conhecer a estrutura e a proposta pedagógica." },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <AgendamentoClient />
    </>
  );
}
