// app/components/NewsCarousel.tsx
"use client";

import { useEffect, useMemo, useState, useId } from "react";

type NewsItem = {
  img: string;
  title: string;
  href?: string;
};

type NewsCarouselProps = {
  items: NewsItem[];
  /** Cartões por página (ex.: 1 no mobile, 3 no desktop) */
  perPage?: 1 | 2 | 3 | 4;
  /** Classe de altura do bloco da imagem (ex.: "h-[240px]") */
  heightClass?: string;
  /** Rótulo acessível do carrossel */
  ariaLabel?: string;
};

export default function NewsCarousel({
  items,
  perPage = 3,
  heightClass,
  ariaLabel = "Carrossel de notícias",
}: NewsCarouselProps) {
  /**
   * Desktop (mantido igual ao seu layout original)
   */
  const IMG_H_DESK = 232;
  const DOT_OFFSET_DESK = 82; // distância dos dots a partir da base da imagem
  const ARROW_OFFSET_DESK = -48; // setas “para fora” no desktop

  /**
   * Mobile (ajustes p/ caber setas e dots sem ficar em cima da imagem)
   */
  const IMG_H_MOBILE = 180;
  const DOT_OFFSET_MOBILE = 56;
  const ARROW_OFFSET_MOBILE = 8;
  const SIDE_GUTTER_MOBILE = 56;

  // detecta mobile sem afetar SSR
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  // reduz movimento para quem prefere
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const update = () => setReduceMotion(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const perPageEffective = (isMobile ? 1 : perPage) as 1 | 2 | 3 | 4;
  const IMG_H = isMobile ? IMG_H_MOBILE : IMG_H_DESK;
  const DOT_OFFSET = isMobile ? DOT_OFFSET_MOBILE : DOT_OFFSET_DESK;
  const ARROW_LEFT = isMobile ? ARROW_OFFSET_MOBILE : ARROW_OFFSET_DESK;
  const ARROW_RIGHT = isMobile ? ARROW_OFFSET_MOBILE : ARROW_OFFSET_DESK;

  const pages = Math.max(1, Math.ceil(items.length / perPageEffective));
  const [page, setPage] = useState(0);
  const hasNav = pages > 1;

  // garante que a página atual não estoure ao mudar o perPage (ex.: rotacionar)
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

  // Acessibilidade via teclado no contêiner do carrossel
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go("next");
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go("prev");
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0);
    } else if (e.key === "End") {
      e.preventDefault();
      go(pages - 1);
    }
  };

  // ids para ligação ARIA
  const statusId = useId();
  const viewportId = useId();

  // grid responsiva no desktop conforme perPage desejado
  const gridMdCols =
    perPage === 4
      ? "md:grid-cols-4"
      : perPage === 3
      ? "md:grid-cols-3"
      : perPage === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-1";

  // sizes das imagens (ajuda o browser a baixar a resolução certa)
  const imgSizes = isMobile
    ? "100vw"
    : perPage === 4
    ? "(min-width:1024px) 25vw, (min-width:768px) 50vw, 100vw"
    : perPage === 3
    ? "(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
    : perPage === 2
    ? "(min-width:768px) 50vw, 100vw"
    : "100vw";

  // paddingBottom reserva espaço dos dots para não “invadir” o título
  return (
    <div
      className="relative"
      style={{ paddingBottom: DOT_OFFSET + 24 }}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      aria-describedby={statusId}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {/* ===== SETAS ===== */}
      {hasNav && (
        <div
          className="pointer-events-none absolute left-0 right-0 z-10"
          style={{ top: IMG_H / 2 }}
        >
          <button
            type="button"
            onClick={() => go("prev")}
            aria-label="Anterior"
            aria-controls={viewportId}
            className="pointer-events-auto absolute top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-600/40"
            style={{ left: ARROW_LEFT }}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            onClick={() => go("next")}
            aria-label="Próximo"
            aria-controls={viewportId}
            className="pointer-events-auto absolute top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-600/40"
            style={{ right: ARROW_RIGHT }}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      )}

      {/* ===== Dots ===== */}
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
                aria-current={i === page ? "page" : undefined}
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
      <div
        id={viewportId}
        className={`grid items-start gap-5 grid-cols-1 ${gridMdCols}`}
      >
        {view.map((n, idx) => {
          const ImageWrapperStyle = heightClass ? undefined : { height: IMG_H as number };
          const imgMotionClasses = reduceMotion
            ? "" // sem hover motion
            : "transition-transform duration-300 group-hover:scale-[1.02]";

          const Card = (
            <div
              className="overflow-hidden rounded-2xl border bg-white shadow-sm mx-auto"
              style={{
                width: isMobile ? `calc(100% - ${2 * SIDE_GUTTER_MOBILE}px)` : "100%",
              }}
            >
              <div
                className={`w-full overflow-hidden ${heightClass ?? ""}`}
                style={ImageWrapperStyle}
              >
                <img
                  src={n.img}
                  alt={n.title}
                  className={`h-full w-full object-cover ${imgMotionClasses}`}
                  loading={page === 0 && idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={page === 0 && idx === 0 ? "high" : "low"}
                  width={1200}
                  height={675}
                  draggable={false}
                  sizes={imgSizes}
                />
              </div>
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

      {/* Status para leitores de tela (anuncia a página atual) */}
      <p id={statusId} className="sr-only" aria-live="polite">
        Página {page + 1} de {pages}
      </p>
    </div>
  );
}
