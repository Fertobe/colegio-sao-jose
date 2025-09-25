// app/matriculas/Passos.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import BrandIcon from "../components/icons/BrandIcon"; // ⬅️ usa os ícones centralizados

type Props = {
  imgSrc: string;
  telefone: string;
  whatsappLabel: string;
  whatsappUrl: string;
};

export default function Passos({
  imgSrc,
  telefone,
  whatsappLabel,
  whatsappUrl,
}: Props) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const Pill = ({ n, label }: { n: 1 | 2 | 3 | 4; label: string }) => (
    <button
      onClick={() => setStep(n)}
      className={[
        "rounded-full px-5 py-2 text-sm font-semibold transition",
        step === n
          ? "bg-brand-700 text-white"
          : "border border-brand-300 text-brand-700 hover:bg-brand-50",
      ].join(" ")}
      aria-current={step === n ? "step" : undefined}
    >
      {label}
    </button>
  );

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {/* Título e subtítulo */}
        <div className="text-center">
          <h2 className="text-[26px] md:text-[34px] font-extrabold leading-tight text-brand-900">
            Estamos felizes com o seu interesse em realizar a{" "}
            <span className="text-brand-700">matrícula</span> no Colégio São José!
          </h2>
          <p className="mt-3 text-brand-800/80">
            Abaixo, você confere um passo a passo que explica o processo do início ao fim.
          </p>
        </div>

        {/* Stepper */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <Pill n={1} label="Passo 1" />
          <div className="h-[2px] w-10 bg-brand-200" />
          <Pill n={2} label="Passo 2" />
          <div className="h-[2px] w-10 bg-brand-200" />
          <Pill n={3} label="Passo 3" />
          <div className="h-[2px] w-10 bg-brand-200" />
          <Pill n={4} label="Passo 4" />
        </div>

        {/* Conteúdo do passo */}
        <div className="mt-10 grid items-start gap-10 md:grid-cols-2">
          {/* Texto */}
          <div>
            {/* Título com ícone */}
            <div className="flex items-start gap-3">
              <div
                className="
                  mt-0.5 inline-flex h-10 w-10 flex-none shrink-0
                  items-center justify-center rounded-full ring-2 ring-brand-300
                  text-brand-700
                "
              >
                {step === 1 && (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                )}
                {step === 2 && (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path d="M3 4h18M8 2v4m8-4v4M3 8h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" />
                  </svg>
                )}
                {step === 3 && (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path d="M4 4h16v16H4z" />
                    <path d="M8 9h8M8 13h5" />
                  </svg>
                )}
                {step === 4 && (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path d="M20 7 9 18l-5-5" />
                  </svg>
                )}
              </div>

              {step === 1 && (
                <h3 className="text-[22px] md:text-[26px] font-extrabold text-brand-900 leading-snug">
                  Me interessei pelo colégio. <br className="hidden md:block" />
                  Como eu entro em contato?
                </h3>
              )}
              {step === 2 && (
                <h3 className="text-[22px] md:text-[26px] font-extrabold text-brand-900 leading-snug">
                  O que acontece na visita?
                </h3>
              )}
              {step === 3 && (
                <h3 className="text-[22px] md:text-[26px] font-extrabold text-brand-900 leading-snug">
                  Quais documentos levar?
                </h3>
              )}
              {step === 4 && (
                <h3 className="text-[22px] md:text-[26px] font-extrabold text-brand-900 leading-snug">
                  Como finalizo a matrícula?
                </h3>
              )}
            </div>

            {/* Blocos por passo */}
            {step === 1 && (
              <div className="mt-6 space-y-5 text-brand-800">
                {/* Pelo site */}
                <div className="flex items-center gap-3">
                  <BrandIcon
                    name="globe"
                    className="h-5 w-5 text-brand-700 shrink-0"
                    title="Site"
                  />
                  <span className="text-brand-900 font-semibold">Pelo site,</span>
                  <Link
                    href="/agendamento"
                    className="ml-2 inline-flex items-center justify-center rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600"
                  >
                    clicando aqui
                  </Link>
                </div>

                {/* Presencialmente */}
                <div className="flex items-center gap-3">
                  <BrandIcon
                    name="pinHome"
                    className="h-5 w-5 text-brand-700 shrink-0"
                    title="Presencialmente"
                  />
                  <p>Presencialmente, indo até a unidade de interesse.</p>
                </div>

                {/* Central (telefone) */}
                <div className="flex items-center gap-3">
                  <BrandIcon
                    name="phone"
                    className="h-5 w-5 text-brand-700 shrink-0"
                    title="Telefone"
                  />
                  <p>
                    Ligando para a Central de Agendamento no número:{" "}
                    <strong className="text-brand-900">{telefone}</strong>.
                  </p>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center gap-3">
                  {/* WhatsApp oficial; herda cor via currentColor */}
                  <BrandIcon
                    name="whatsapp"
                    color="currentColor"
                    className="h-[22px] w-[22px] text-brand-700 shrink-0"
                    title="WhatsApp"
                  />
                  <span className="text-brand-900 font-semibold">Pelo WhatsApp:</span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Abrir WhatsApp"
                    className="ml-2 inline-flex items-center rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
                  >
                    {whatsappLabel}
                  </a>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="mt-6 space-y-5 text-brand-800">
                <p>
                  Na visita presencial, a família conhecerá a{" "}
                  <strong className="text-brand-900">estrutura física</strong> e a{" "}
                  <strong className="text-brand-900">proposta pedagógica</strong> da escola.
                  Todo o tour é feito com acompanhamento de um profissional do{" "}
                  <strong className="text-brand-900">Colégio São José</strong>, que passará
                  as principais informações e esclarecerá as dúvidas da família.
                </p>
                <p className="font-semibold text-brand-900">
                  É uma oportunidade única de vivenciar os espaços e sentir a energia da escola.
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="mt-6 space-y-3 text-brand-800">
                <p>Levar (cópia e original quando possível):</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>CPF (Responsáveis e Aluno);</li>
                  <li>RG (Responsáveis e Aluno);</li>
                  <li>Certidão de Nascimento do Aluno;</li>
                  <li>RG (Aluno);</li>
                  <li>CPF (Aluno);</li>
                  <li>Carteira de Vacinação do Aluno;</li>
                  <li>Comprovante de Residência (COPEL);</li>
                  <li>Histórico Escolar do Estudante.</li>
                </ul>
              </div>
            )}

            {step === 4 && (
              <div className="mt-6 space-y-3 text-brand-800">
                <p>Para finalizar a matrícula, realizamos:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Conferência dos documentos.</li>
                  <li>Assinatura do contrato.</li>
                  <li>Orientações sobre material e início das aulas.</li>
                </ul>
                <p className="text-brand-900 font-semibold">
                  Dúvidas? Fale com nossa Central: {telefone}.
                </p>
              </div>
            )}
          </div>

          {/* Imagem (mesma para todos os passos) */}
          <div className="relative">
            <img
              src={imgSrc}
              alt="Imagem ilustrativa do passo"
              className="h-auto w-full rounded-2xl object-cover ring-1 ring-black/10"
              loading="lazy"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
