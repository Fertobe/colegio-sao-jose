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
  // ✅ ref tipado com possibilidade de null
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback para navegadores sem IntersectionObserver
    if (typeof window !== "undefined" && !(window as any).IntersectionObserver) {
      setInView(true);
      return;
    }

    // ✅ callback tipado e com checagem de undefined
    const io = new IntersectionObserver(
      (entries: IntersectionObserverEntry[], observer) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // anima só na primeira vez
        }
      },
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={bg}
      // melhora pintura inicial evitando reflow grande
      style={{ contentVisibility: "auto" as any, containIntrinsicSize: "800px" as any }}
    >
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-16 grid gap-10 md:grid-cols-2 items-center">
        {/* Objeto à esquerda */}
        <div
          className={`flex justify-center md:justify-start transform transition-all duration-700
                      ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          <img
            src={objetoSrc}
            alt={objetoAlt}
            style={{ height: objetoHeight }}
            className="w-auto select-none pointer-events-none"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            draggable={false}
            // Se o chamador informar a largura, ajudamos o CLS
            {...(objetoWidth ? { width: objetoWidth, height: objetoHeight } : {})}
            // Quando alt vazio, a imagem é decorativa
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
