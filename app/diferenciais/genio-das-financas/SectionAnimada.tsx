// app/diferenciais/genio-das-financas/SectionAnimada.tsx
"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  bg?: string;            // ex.: "bg-white" | "bg-gray-50"
  titulo: string;
  texto: string;
  objetoSrc: string;
  objetoAlt?: string;
  objetoHeight?: number;  // px
  /** opcional: se souber a largura da arte, ajuda o CLS */
  objetoWidth?: number;   // px
};

export default function SectionAnimada({
  bg = "bg-white",
  titulo,
  texto,
  objetoSrc,
  objetoAlt = "",
  objetoHeight = 360,
  objetoWidth,
}: Props) {
  // Use HTMLElement (não existe HTMLSectionElement nas libs DOM)
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries, observer) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`${bg} paint-hints`}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-16">
        {/* Objeto à esquerda */}
        <div
          className={`flex justify-center md:justify-start will-change-transform transition-all duration-700 transform
                      ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          <img
            src={objetoSrc}
            alt={objetoAlt}
            {...(objetoWidth
              ? { width: objetoWidth, height: objetoHeight }
              : { style: { height: objetoHeight } })}
            className="w-auto select-none pointer-events-none"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            draggable={false}
            aria-hidden={objetoAlt === "" ? true : undefined}
          />
        </div>

        {/* Texto à direita */}
        <div className="space-y-4">
          <h3
            className={`text-[#1F7A3F] font-extrabold tracking-tight leading-snug
                        text-[24px] md:text-[28px] lg:text-[30px]
                        transform transition-all duration-700 delay-100
                        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          >
            {titulo}
          </h3>
          <p
            className={`text-[#1b2b42] font-medium leading-8
                        text-[17px] md:text-[18px] lg:text-[19px]
                        transform transition-all duration-700 delay-200
                        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          >
            {texto}
          </p>
        </div>
      </div>

      <style jsx>{`
        /* Dicas de pintura (performance) sem "as any" no TS */
        .paint-hints {
          content-visibility: auto;
          contain-intrinsic-size: 800px;
        }

        @media (prefers-reduced-motion: reduce) {
          .transform,
          .transition-all {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
