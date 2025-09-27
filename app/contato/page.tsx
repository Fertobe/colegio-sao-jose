// app/contato/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import BackToTop from "../components/BackToTop";
import ContatoForm from "./ContatoForm";
import BrandIcon from "../components/icons/BrandIcon"; // ✅ ícones centralizados

// ============ META ============
export const metadata: Metadata = {
  title: "Contato | Colégio São José",
  description:
    "Fale conosco: telefone, WhatsApp, e-mail, formulário e mapa do Colégio São José.",
};

// ============ CONFIG ============
// DESKTOP mantém a mesma arte/posicionamento
const HERO_DESKTOP = {
  src: "/contato/hero.webp",
  alt: "Equipe de atendimento do Colégio São José",
};
// MOBILE: coloque a PNG recortada (transparência) em /public/contato/mobile/hero.webp
const HERO_MOBILE = {
  src: "/contato/mobile/hero.webp",
  alt: "Equipe de atendimento do Colégio São José (mobile)",
};

const TELEFONE = "+55 (42) 3446-2212";
const EMAIL = "contato@colegiosaojose.net";
const WHATSAPP_URL = "https://wa.me/5542998276516";
const MAPS_EMBED =
  "https://www.google.com/maps?q=R.+C%C3%A2ndido+de+Abreu,+1636+-+Prudent%C3%B3polis,+PR,+84400-000&output=embed";
const MAPS_LINK =
  "https://www.google.com/maps/place/R.+C%C3%A2ndido+de+Abreu,+1636+-+Prudent%C3%B3polis,+PR,+84400-000/@-25.2140252,-50.9746768,3a,75y,323.69h,90t/data=!3m7!1e1!3m5!1sWN9GgL0cOO7Z1nelRQCkhw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3DWN9GgL0cOO7Z1nelRQCkhw%26yaw%3D323.69373!7i16384!8i8192!4m6!3m5!1s0x94e8eaf79b45a20d:0x6204f5fe513870b!8m2!3d-25.2141198!4d-50.9750099!16s%2Fg%2F11bw442r8f";
// =================================

export default function ContatoPage() {
  return (
    <main className="bg-white">
      {/* ===== HERO (desktop inalterado + versão mobile com tuning) ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600" />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-20 lg:py-24">
          {/* Esquerda: texto */}
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-300" />
              Contato
            </span>
            <h1 className="mt-3 text-[32px] font-extrabold leading-tight md:text-5xl">
              Fale conosco
              <span className="block text-brand-300">Colégio São José</span>
            </h1>
            <p className="mt-4 max-w-3xl text-white/90 md:text-lg">
              Estamos à disposição para tirar dúvidas sobre matrículas, secretaria,
              financeiro e pedagógico.
            </p>
          </div>

          {/* Direita: IMAGEM (duas versões para não mexer no desktop) */}
          <div className="relative mx-auto aspect-square w-[320px] md:w-[420px] lg:w-[520px]">
            {/* Mobile: PNG com transparência + tuning independente */}
            <div className="md:hidden">
              <img
                src={HERO_MOBILE.src}
                alt={HERO_MOBILE.alt}
                className="absolute left-1/2 bottom-[-10px] h-[118%] w-auto max-w-none select-none object-contain origin-bottom drop-shadow-[0_25px_40px_rgba(0,0,0,.35)]"
                style={{
                  // ✅ inclui o translateX(-50%) para centralizar corretamente
                  transform: "translateX(-50%) translateY(12px) scale(0.98)",
                }}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                draggable={false}
              />
            </div>

            {/* Desktop/Tablet: mantém EXACTAMENTE o que já estava */}
            <div className="hidden md:block">
              <img
                src={HERO_DESKTOP.src}
                alt={HERO_DESKTOP.alt}
                className="
                  absolute left-1/2 -translate-x-1/2
                  bottom-[-10px] md:bottom-[-10px] lg:bottom-[-86px]
                  h-[115%] md:h-[122%] lg:h-[130%] w-auto max-w-none
                  select-none object-contain origin-bottom
                  drop-shadow-[0_25px_40px_rgba(0,0,0,.35)]
                "
                loading="eager"
                decoding="async"
                fetchPriority="high"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Onda branca padronizada (altura padrão) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30">
          <svg
            viewBox="0 0 1440 140"
            className="h-[90px] w-full md:h-[110px] lg:h-[130px]"
            preserveAspectRatio="none"
          >
            <path d="M0,80 C320,140 920,10 1440,90 L1440,140 L0,140 Z" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* ===== Canais ===== */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Telefone */}
            <a
              href={`tel:${TELEFONE.replace(/\D/g, "")}`}
              className="group rounded-2xl border border-brand-100 p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <BrandIcon name="phone" className="h-6 w-6 text-brand-700" title="Telefone" />
                <p className="font-semibold text-brand-900">Central</p>
              </div>
              <p className="mt-2 text-brand-800/85">{TELEFONE}</p>
            </a>

            {/* WhatsApp */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-brand-100 p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <BrandIcon
                  name="whatsapp"
                  color="currentColor"
                  className="h-6 w-6 text-brand-700"
                  title="WhatsApp"
                />
                <p className="font-semibold text-brand-900">WhatsApp</p>
              </div>
              <span className="mt-3 inline-flex rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600">
                Abrir conversa
              </span>
            </a>

            {/* E-mail */}
            <a
              href={`mailto:${EMAIL}`}
              className="rounded-2xl border border-brand-100 p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <BrandIcon name="mail" className="h-6 w-6 text-brand-700" title="E-mail" />
                <p className="font-semibold text-brand-900">E-mail</p>
              </div>
              <p className="mt-2 break-all text-brand-800/85">{EMAIL}</p>
            </a>

            {/* Agendar visita */}
            <Link
              href="/agendamento"
              className="rounded-2xl border border-brand-100 p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <BrandIcon name="calendar" className="h-6 w-6 text-brand-700" title="Agendar visita" />
                <p className="font-semibold text-brand-900">Agendar visita</p>
              </div>
              <span className="mt-3 inline-flex rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600">
                Ir para o agendamento
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Formulário + Mapa ===== */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
          <div className="grid items-start gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-brand-700">Envie uma mensagem</h2>
              <p className="mt-2 text-brand-800/85">
                Preencha os campos e vamos responder o quanto antes. Campos com * são obrigatórios.
              </p>
              <div className="mt-6 rounded-2xl border border-brand-100 p-6 shadow-sm">
                {/* ⚠️ Form agora só com “Enviar por e-mail” (sem botão WhatsApp) */}
                <ContatoForm email={EMAIL} />
              </div>
            </div>

            {/* Mapa */}
            <div>
              <h3 className="text-xl font-bold text-brand-700">Onde estamos</h3>
              <div className="relative mt-4">
                <div className="h-[3px] w-full rounded-full bg-brand-400" />
                <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2">
                  <span className="mx-auto block h-5 w-5 rounded-full bg-brand-400 ring-8 ring-brand-400/25" />
                </div>
              </div>
              <div className="mt-6 overflow-hidden rounded-2xl shadow ring-1 ring-black/10">
                <iframe
                  src={MAPS_EMBED}
                  width="100%"
                  height="340"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="mt-4">
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-brand-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-600"
                >
                  Ver no Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top — azul */}
      <BackToTop
        variant="brand"
        threshold={500}
        className="!bg-brand-700 hover:!bg-brand-600 !text-white !ring-white/40"
      />
    </main>
  );
}
