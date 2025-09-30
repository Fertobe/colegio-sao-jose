"use client";

import { KeyboardEvent, useId, useState } from "react";
import Link from "next/link";

type Step = 1 | 2 | 3 | 4;

type Props = {
  passoImg: string;
  centralTelefone: string;   // pode vir com espaços/traços; sanitizo pro tel:
  whatsappLabel: string;
  whatsappUrl: string;
};

export default function MatriculasSteps({
  passoImg,
  centralTelefone,
  whatsappLabel,
  whatsappUrl,
}: Props) {
  const [active, setActive] = useState<Step>(1);
  const uid = useId();

  // tel: + somente dígitos e +
  const telHref = `tel:${centralTelefone.replace(/[^+\d]/g, "")}`;

  const pillId = (n: Step) => `${uid}-tab-${n}`;
  const panelId = (n: Step) => `${uid}-panel-${n}`;

  const onTabListKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const order: Step[] = [1, 2, 3, 4];
    const idx = order.indexOf(active);

    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = order[(idx + 1) % order.length] as Step; // ⬅️ fix TS
      setActive(next);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = order[(idx - 1 + order.length) % order.length] as Step; // ⬅️ fix TS
      setActive(prev);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(1);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(4);
    }
  };

  const Pill = ({ n, label }: { n: Step; label: string }) => {
    const isActive = n === active;
    return (
      <button
        id={pillId(n)}
        type="button"
        role="tab"
        aria-controls={panelId(n)}
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        onClick={() => setActive(n)}
        className={
          isActive
            ? "rounded-full bg-brand-700 px-5 py-2 text-sm font-semibold text-white"
            : "rounded-full border border-brand-300 px-5 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
        }
      >
        {label}
      </button>
    );
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {/* Stepper */}
        <div
          role="tablist"
          aria-label="Passos de matrícula"
          className="flex items-center justify-center gap-3"
          onKeyDown={onTabListKey}
        >
          <Pill n={1} label="Passo 1" />
          <div className="h-[2px] w-10 bg-brand-200" aria-hidden="true" />
          <Pill n={2} label="Passo 2" />
          <div className="h-[2px] w-10 bg-brand-200" aria-hidden="true" />
          <Pill n={3} label="Passo 3" />
          <div className="h-[2px] w-10 bg-brand-200" aria-hidden="true" />
          <Pill n={4} label="Passo 4" />
        </div>

        {/* Conteúdo + imagem (a imagem é a mesma para todos os passos) */}
        <div className="mt-10 grid items-start gap-10 md:grid-cols-2">
          {/* ---- Conteúdo baseado no passo ativo ---- */}
          <div>
            {/* PASSO 1 */}
            <div
              id={panelId(1)}
              role="tabpanel"
              aria-labelledby={pillId(1)}
              hidden={active !== 1}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-brand-300 text-brand-700">
                  {/* coração / interesse */}
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-.99-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.77-8.84a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <h3 className="text-[22px] md:text-[26px] font-extrabold text-brand-900 leading-snug">
                  Me interessei pelo colégio. <br />
                  Como eu entro em contato?
                </h3>
              </div>

              <p className="mt-6 text-brand-900/90 text-[16px] md:text-[17px] leading-8">
                O contato pode ser feito das seguintes formas:
              </p>

              <ul className="mt-4 space-y-4 text-brand-900/90 text-[16px] md:text-[17px] leading-8">
                <li className="flex items-center gap-3">
                  <span className="text-brand-700">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M4 4h16v16H4z" />
                    </svg>
                  </span>
                  Pelo site,&nbsp;
                  <Link
                    href="/agendamento"
                    className="inline-flex rounded-full bg-brand-700 px-3 py-1.5 text-white font-semibold hover:bg-brand-600"
                  >
                    clicando aqui
                  </Link>
                </li>

                <li className="flex items-center gap-3">
                  <span className="text-brand-700">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M12 2v20M2 12h20" />
                    </svg>
                  </span>
                  Presencialmente, indo até a unidade de interesse.
                </li>

                <li className="flex items-center gap-3">
                  <span className="text-brand-700">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M22 16.92V21a1 1 0 0 1-1.1 1 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 11.73 19.79 19.79 0 0 1 0 3.1 1 1 0 0 1 1 2h4.09A1 1 0 0 1 6.1 2.91a12.74 12.74 0 0 0 .7 2.22 1 1 0 0 1-.23 1.05L5.21 7.54a16 16 0 0 0 6.26 6.26l1.36-1.36a1 1 0 0 1 1.05-.23 12.74 12.74 0 0 0 2.22.7 1 1 0  0 1 .91 1V21a1 1 0 0 1-1.1 1" />
                    </svg>
                  </span>
                  Ligando para a Central de Agendamento no número:&nbsp;
                  <a
                    href={telHref}
                    aria-label={`Ligar para ${centralTelefone}`}
                    className="text-brand-900 font-semibold underline underline-offset-2"
                  >
                    {centralTelefone}
                  </a>
                  .
                </li>
              </ul>

              {/* WhatsApp — somente no Passo 1 */}
              <div className="mt-5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-500"
                >
                  <svg
                    viewBox="0 0 32 32"
                    className="mr-2 h-[18px] w-[18px]"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M19.11 17.59a7.93 7.93 0 0 1-3.29-3.29c-.16-.3-.03-.68.25-.86l.66-.42c.42-.27.55-.83.3-1.28l-.82-1.5c-.3-.55-.98-.77-1.54-.5-1.06.52-1.78 1.55-1.82 2.72-.06 1.91.83 4.04 2.67 5.88 1.84 1.84 3.97 2.73 5.88 2.67 1.17-.04 2.2-.76 2.72-1.82.27-.56.05-1.24-.5-1.54l-1.5-.82c-.45-.25-1.01-.12-1.28.3l-.42.66c-.18.29-.56.41-.86.25Z" />
                    <path d="M16 3C9.92 3 5 7.92 5 14c0 2.03.55 3.95 1.52 5.6L5 27l7.63-1.47A10.86 10.86 0 0 0 16 25c6.08 0 11-4.92 11-11S22.08 3 16 3Zm0 20.5c-1.5 0-2.93-.31-4.22-.88l-.3-.13-3.51.67.66-3.5-.14-.3A9.48 9.48 0 1 1 25.5 14 9.49 9.49 0 0 1 16 23.5Z" />
                  </svg>
                  {whatsappLabel}
                </a>
              </div>
            </div>

            {/* PASSO 2 */}
            <div
              id={panelId(2)}
              role="tabpanel"
              aria-labelledby={pillId(2)}
              hidden={active !== 2}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-brand-300 text-brand-700">
                  {/* ícone visita/local */}
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3 className="text-[22px] md:text-[26px] font-extrabold text-brand-900 leading-snug">
                  O que acontece na visita?
                </h3>
              </div>

              <div className="mt-6 space-y-4 text-brand-900/90 text-[16px] md:text-[17px] leading-8">
                <p>
                  Na visita presencial, a família conhecerá a{" "}
                  <strong className="text-brand-900">estrutura física</strong> e a{" "}
                  <strong className="text-brand-900">proposta pedagógica</strong> da escola.
                  Todo o tour é feito com acompanhamento de um profissional do{" "}
                  <strong className="text-brand-900">Colégio São José</strong>, que passará as
                  principais informações e esclarecerá as dúvidas da família.
                </p>
                <p>
                  <strong className="text-brand-900">
                    É uma oportunidade única de vivenciar os espaços e sentir a energia da escola.
                  </strong>
                </p>
              </div>
            </div>

            {/* PASSO 3 */}
            <div
              id={panelId(3)}
              role="tabpanel"
              aria-labelledby={pillId(3)}
              hidden={active !== 3}
            >
              <h3 className="text-[22px] md:text-[26px] font-extrabold text-brand-900 leading-snug">
                Passo 3
              </h3>
              <p className="mt-4 text-brand-900/80">
                Conteúdo do Passo 3 — me diga o texto que você quer aqui e eu coloco.
              </p>
            </div>

            {/* PASSO 4 */}
            <div
              id={panelId(4)}
              role="tabpanel"
              aria-labelledby={pillId(4)}
              hidden={active !== 4}
            >
              <h3 className="text-[22px] md:text-[26px] font-extrabold text-brand-900 leading-snug">
                Passo 4
              </h3>
              <p className="mt-4 text-brand-900/80">
                Conteúdo do Passo 4 — me diga o texto que você quer aqui e eu coloco.
              </p>
            </div>
          </div>

          {/* ---- Imagem única (replicada) ---- */}
          <div className="relative">
            <img
              src={passoImg}
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
