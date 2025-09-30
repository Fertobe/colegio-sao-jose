"use client";

import { useEffect, useMemo, useState } from "react";

type NewsItem = {
  img: string;
  title: string;
  href?: string;
};

export default function NewsCarousel({
  items,
  perPage = 3,
}: {
  items: NewsItem[];
  perPage?: number;
}) {
  /**
   * Desktop (mantido igual ao seu layout original)
   */
  const IMG_H_DESK = 232;
  const DOT_OFFSET_DESK = 82; // distância das bolinhas a partir da base da imagem
  const ARROW_OFFSET_DESK = -48; // setas “para fora” no desktop

  /**
   * Mobile (apenas ajustes para caber setas e dots sem ficar em cima da imagem)
   */
  const IMG_H_MOBILE = 180;          // imagem mais baixa no mobile
  const DOT_OFFSET_MOBILE = 56;      // espaço menor para os dots
  const ARROW_OFFSET_MOBILE = 8;     // setas “para dentro” (perto da borda)
  const SIDE_GUTTER_MOBILE = 56;     // margem lateral reservada p/ as setas

  // detecta mobile sem afetar SSR
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  const perPageEffective = isMobile ? 1 : perPage;
  const IMG_H = isMobile ? IMG_H_MOBILE : IMG_H_DESK;
  const DOT_OFFSET = isMobile ? DOT_OFFSET_MOBILE : DOT_OFFSET_DESK;
  const ARROW_LEFT = isMobile ? ARROW_OFFSET_MOBILE : ARROW_OFFSET_DESK;
  const ARROW_RIGHT = isMobile ? ARROW_OFFSET_MOBILE : ARROW_OFFSET_DESK;

  const pages = Math.max(1, Math.ceil(items.length / perPageEffective));
  const [page, setPage] = useState(0);
  const hasNav = pages > 1;

  // garante que a página atual não estoure ao mudar o perPage (ex.: rotacionar tela)
  useEffect(() => {
    setPage((p) => Math.min(p, pages - 1));
  }, [pages]);

  const view = useMemo(() => {
    const start = page * perPageEffective;
    return items.slice(start, start + perPageEffective);
  }, [items, page, perPageEffective]);

  const go = (dir: "prev" | "next" | number) => {
    if (!hasNav) return;
    if (dir === "prev") setPage((p) => (p - 1 + pages) % pages);
    else if (dir === "next") setPage((p) => (p + 1) % pages);
    else setPage(Math.min(Math.max(0, dir), pages - 1));
  };

  // paddingBottom reserva espaço das bolinhas para não “invadir” o título
  return (
    <div className="relative" style={{ paddingBottom: DOT_OFFSET + 24 }}>
      {/* ===== SETAS (desktop: fora; mobile: para dentro e fora da imagem) ===== */}
      {hasNav && (
        <div
          className="pointer-events-none absolute left-0 right-0 z-10"
          style={{ top: IMG_H / 2 }}
        >
          <button
            type="button"
            onClick={() => go("prev")}
            aria-label="Anterior"
            className="pointer-events-auto absolute top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-600/40"
            style={{ left: ARROW_LEFT }}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => go("next")}
            aria-label="Próximo"
            className="pointer-events-auto absolute top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-600/40"
            style={{ right: ARROW_RIGHT }}
          >
            ›
          </button>
        </div>
      )}

      {/* ===== BOLINHAS (abaixo da imagem, fixas e centralizadas) ===== */}
      {hasNav && (
        <div
          className="pointer-events-auto absolute left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 shadow"
          style={{ top: IMG_H + DOT_OFFSET }}
        >
          <div className="flex items-center gap-3">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                aria-label={`Ir para página ${i + 1}`}
                onClick={() => go(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === page
                    ? "bg-brand-600 ring-2 ring-brand-600/30"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ===== GRID DE CARDS ===== */}
      <div className="grid items-start gap-5 grid-cols-1 md:grid-cols-3">
        {view.map((n, idx) => {
          const Card = (
            <div
              className="overflow-hidden rounded-2xl border bg-white shadow-sm mx-auto"
              style={{
                width: isMobile ? `calc(100% - ${2 * SIDE_GUTTER_MOBILE}px)` : "100%",
              }}
            >
              <img
                src={n.img}
                alt={n.title}
                style={{ height: IMG_H }}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                loading={page === 0 && idx === 0 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={page === 0 && idx === 0 ? "high" : "low"}
                width={1200}
                height={675}
                draggable={false}
              />
            </div>
          );

          return n.href ? (
            <a key={`${page}-${idx}-${n.title}`} href={n.href} className="group block">
              {Card}
              <h3 className="mt-6 min-h-[64px] text-base font-semibold text-gray-900 group-hover:underline decoration-2 underline-offset-4">
                {n.title}
              </h3>
            </a>
          ) : (
            <div
              key={`${page}-${idx}-${n.title}`}
              className="group block cursor-default"
              role="group"
              aria-label={n.title}
            >
              {Card}
              <h3 className="mt-6 min-h-[64px] text-base font-semibold text-gray-900">
                {n.title}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
