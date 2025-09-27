// app/matriculas/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import BackToTop from "../components/BackToTop";
import Passos from "./Passos";

export const metadata: Metadata = {
  title: "Matrículas | Colégio São José",
  description:
    "Estamos felizes com o seu interesse! Agende sua visita e conheça nossa proposta pedagógica. Matrículas abertas.",
};

// ==================== CONFIG FÁCIL ====================
const HERO_IMG = "/matriculas/Hero.webp";
const PASSO_IMG = "/matriculas/passo.webp";

const MAPS_EMBED =
  "https://www.google.com/maps?q=R.+C%C3%A2ndido+de+Abreu,+1636+-+Prudent%C3%B3polis,+PR,+84400-000&output=embed";
const MAPS_LINK =
  "https://www.google.com/maps/place/R.+C%C3%A2ndido+de+Abreu,+1636+-+Prudent%C3%B3polis,+PR,+84400-000/@-25.2140252,-50.9746768,3a,75y,323.69h,90t/data=!3m7!1e1!3m5!1sWN9GgL0cOO7Z1nelRQCkhw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3DWN9GgL0cOO7Z1nelRQCkhw%26yaw%3D323.69373!7i16384!8i8192!4m6!3m5!1s0x94e8eaf79b45a20d:0x6204f5fe513870b!8m2!3d-25.2141198!4d-50.9750099!16s%2Fg%2F11bw442r8f";

const CENTRAL_TELEFONE = "+55 (42) 3446-2212";
const WHATSAPP_LABEL = "Matrícula";
const WHATSAPP_URL = "https://wa.me/5542998276516";
// =====================================================

export default function MatriculasPage() {
  return (
    <main className="bg-white">
      {/* ===== HERO (igual) ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600" />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-20 lg:py-24">
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-300" />
              Matrículas
            </span>
            <h1 className="mt-3 text-[32px] font-extrabold leading-tight md:text-5xl">
              Matrículas abertas
              <span className="block text-brand-300">Agende sua visita</span>
            </h1>
            <p className="mt-4 text-base text-white/90 md:text-lg">
              Venha conhecer nossa estrutura, proposta pedagógica e as oportunidades
              que preparamos para cada etapa da jornada escolar.
            </p>
            <div className="mt-6">
              <Link
                href="/agendamento"
                className="inline-flex rounded-full bg-brand-300 px-5 py-3 font-semibold text-brand-900 shadow-lg transition hover:bg-brand-200"
              >
                Agendar visita
              </Link>
            </div>
          </div>

          {/* direita: imagem (cresce sem alterar a altura do herói) */}
          <div className="relative mx-auto aspect-square w-[320px] md:w-[420px] lg:w-[520px]">
            <img
              src={HERO_IMG}
              alt="Família conhecendo o colégio para matrícula"
              className="
                absolute left-1/2 -translate-x-1/2
                /* ⬇️ MOBILE: desce um pouco mais para não cortar */
                bottom-[-42px]
                md:bottom-[-10px] lg:bottom-[-26px]
                /* ⬇️ MOBILE: aumenta levemente a altura para compensar */
                h-[125%]
                md:h-[122%] lg:h-[115%]
                w-auto max-w-none
                select-none object-contain origin-bottom
                drop-shadow-[0_25px_40px_rgba(0,0,0,.35)]
              "
              loading="eager"
              draggable={false}
            />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30">
          <svg viewBox="0 0 1440 140" className="h-[90px] w-full md:h-[110px] lg:h-[130px]" preserveAspectRatio="none">
            <path d="M0,80 C320,140 920,10 1440,90 L1440,140 L0,140 Z" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* ===== PASSO A PASSO (interativo, mantendo o visual) ===== */}
      <Passos
        imgSrc={PASSO_IMG}
        telefone={CENTRAL_TELEFONE}
        whatsappLabel={WHATSAPP_LABEL}
        whatsappUrl={WHATSAPP_URL}
      />

      {/* ===== ONDE ESTAMOS (igual, com 1 círculo na régua) ===== */}
      <section id="onde-estamos" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <h2 className="text-2xl font-bold text-brand-700 uppercase">Onde estamos</h2>
          <div className="relative mt-6">
            <div className="h-[3px] w-full rounded-full bg-brand-400" />
            <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2">
              <span className="mx-auto block h-5 w-5 rounded-full bg-brand-400 ring-8 ring-brand-400/25" />
            </div>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl shadow ring-1 ring-black/10">
              <iframe
                title="Mapa do Colégio São José"
                src={MAPS_EMBED}
                width="100%"
                height="360"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-brand-900 font-semibold">Colégio São José</p>
              <p className="mt-1 text-brand-800/80">
                Rua Cândido de Abreu, 1636 — Prudentópolis/PR — 84400-000
              </p>
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

      {/* Back to Top — azul institucional (somente nesta página) */}
      <BackToTop
        variant="brand"
        threshold={600}
        className="!bg-brand-700 hover:!bg-brand-600 !text-white !ring-white/40"
      />
    </main>
  );
}
