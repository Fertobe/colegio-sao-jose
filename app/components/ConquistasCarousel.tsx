"use client";

import { useEffect, useMemo, useState } from "react";

type Item = { src: string; alt?: string; href?: string };

export default function ConquistasCarousel({
  items,
  perPage = 3,
  /** Quando true (default), os cards NÃO são clicáveis */
  disableLinks = true,
}: {
  items: Item[];
  perPage?: number;
  disableLinks?: boolean;
}) {
  /**
   * ===== Desktop (mantido como estava) =====
   */
  const IMG_H_DESK = 400;     // altura da imagem
  const DOT_OFFSET_DESK = 30; // distância das bolinhas
  const ARROW_OUT_DESK = 56;  // setas “para fora” da grade (px)

  /**
   * ===== Mobile (ajustes para caber setas e dots) =====
   */
  const IMG_H_MOBILE = 220;       // imagem um pouco mais baixa
  const DOT_OFFSET_MOBILE = 40;   // espaço para os dots
  const ARROW_IN_MOBILE = 8;      // setas para dentro, próximas às bordas
  const SIDE_GUTTER_MOBILE = 48;  // margem lateral reservada às setas

  // detecta mobile (sem quebrar SSR)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mq = window.matchMedia("(max-width: 767px)");

    const apply = () => setIsMobile(mq.matches);
    apply();

    const handler = () => apply();

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    } else if (typeof (mq as any).addListener === "function") {
      (mq as any).addListener(handler);
      return () => (mq as any).removeListener(handler);
    }
  }, []);

  const perPageEffective = isMobile ? 1 : perPage;
  const IMG_H = isMobile ? IMG_H_MOBILE : IMG_H_DESK;
  const DOT_OFFSET = isMobile ? DOT_OFFSET_MOBILE : DOT_OFFSET_DESK;

  const pages = Math.max(1, Math.ceil(items.length / perPageEffective));
  const [page, setPage] = useState(0);

  // evita “estouro” ao mudar perPage (ex.: rotacionar)
  useEffect(() => {
    setPage((p) => Math.min(p, pages - 1));
  }, [pages]);

  const view = useMemo(() => {
    const start = page * perPageEffective;
    return items.slice(start, start + perPageEffective);
  }, [items, page, perPageEffective]);

  const go = (dir: "prev" | "next" | number) => {
    if (dir === "prev") setPage((p) => (p - 1 + pages) % pages);
    else if (dir === "next") setPage((p) => (p + 1) % pages);
    else setPage(Math.min(Math.max(0, dir), pages - 1));
  };

  const hasControls = pages > 1;

  return (
    // padding-bottom reserva a área das bolinhas (nada “sobe”/“desce”)
    <div className="relative" style={{ paddingBottom: DOT_OFFSET + 26 }}>
      {/* ===== SETAS — desktop: fora; mobile: para dentro e fora da imagem ===== */}
      {hasControls && (
        <div
          className="pointer-events-none absolute left-0 right-0 z-10"
          style={{ top: IMG_H / 2 }}
        >
          <button
            type="button"
            onClick={() => go("prev")}
            aria-label="Anterior"
            className="pointer-events-auto absolute top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-600/40"
            style={{ left: isMobile ? `${ARROW_IN_MOBILE}px` : `-${ARROW_OUT_DESK}px` }}
          >
            ‹
          </button>

          <button
            type="button"
            onClick={() => go("next")}
            aria-label="Próximo"
            className="pointer-events-auto absolute top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-600/40"
            style={{ right: isMobile ? `${ARROW_IN_MOBILE}px` : `-${ARROW_OUT_DESK}px` }}
          >
            ›
          </button>
        </div>
      )}

      {/* ===== BOLINHAS — abaixo da imagem, fixas e centralizadas ===== */}
      {hasControls && (
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

      {/* ===== GRID — desktop 3 por página; mobile 1 por página ===== */}
      <div className="grid items-start gap-6 grid-cols-1 md:grid-cols-3">
        {view.map((it, idx) => {
          const clickable = !disableLinks && !!it.href;

          const CardInner = (
            <div
              className="overflow-hidden rounded-3xl border bg-white p-2 shadow-sm transition mx-auto"
              style={{
                width: isMobile ? `calc(100% - ${2 * SIDE_GUTTER_MOBILE}px)` : "100%",
              }}
            >
              <img
                src={it.src}
                alt={it.alt || "Conquista do colégio"}
                style={{ height: IMG_H }}
                className="w-full rounded-2xl object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                loading={page === 0 && idx === 0 ? "eager" : "lazy"}
                decoding="async"
                {...(page === 0 && idx === 0 ? { fetchPriority: "high" as const } : { fetchPriority: "low" as const })}
                width={1200}
                height={800}
                draggable={false}
              />
            </div>
          );

          return clickable ? (
            <a key={`${page}-${idx}-${it.src}`} href={it.href!} className="group block">
              {CardInner}
            </a>
          ) : (
            <div
              key={`${page}-${idx}-${it.src}`}
              className="group block cursor-default"
              role="group"
              aria-label={it.alt || "Conquista do colégio"}
            >
              {CardInner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
