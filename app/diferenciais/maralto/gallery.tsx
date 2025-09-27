// app/diferenciais/maralto/gallery.tsx
"use client";

import { useEffect, useMemo, useState, useCallback, useRef, type CSSProperties } from "react";

type Props = {
  images: string[];
  /** Quantas imagens por página em md+ (desktop/tablet). Padrão: 3 */
  perPage?: number;
  /** Quantas imagens por página no mobile (< md). Padrão: 1 */
  perPageMobile?: number;
  /** Alturas utilitárias (Tailwind) para as figuras */
  heightClass?: string;
  /** Mostrar setas de navegação (também no mobile). Padrão: true */
  showArrows?: boolean;
  /** Posicionar setas fora da área da imagem. Padrão: true */
  arrowsOutside?: boolean;
};

export default function Gallery({
  images,
  perPage = 3,
  perPageMobile = 1,
  heightClass = "h-56 md:h-72 lg:h-80",
  showArrows = true,
  arrowsOutside = true,
}: Props) {
  // ===== Breakpoint detection (md: 768px) =====
  const [isMdUp, setIsMdUp] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const handle = (e: MediaQueryListEvent | MediaQueryList | any) =>
      setIsMdUp(!!("matches" in e ? e.matches : e.currentTarget?.matches));
    handle(mql);
    mql.addEventListener ? mql.addEventListener("change", handle) : mql.addListener(handle);
    return () => {
      mql.removeEventListener ? mql.removeEventListener("change", handle) : mql.removeListener(handle);
    };
  }, []);

  const itemsPerPage = isMdUp ? perPage : perPageMobile;
  const pages = Math.max(1, Math.ceil(images.length / itemsPerPage));
  const [page, setPage] = useState(0);

  // Evita ficar numa página inválida quando a quantidade muda (ex: rotate/resize)
  useEffect(() => {
    if (page > pages - 1) setPage(0);
  }, [pages, page]);

  // Índices da página atual
  const start = page * itemsPerPage;
  const visible = useMemo(() => images.slice(start, start + itemsPerPage), [images, start, itemsPerPage]);

  // ===== Navegação =====
  const go = useCallback(
    (dir: number) => setPage((p) => (p + dir + pages) % pages),
    [pages]
  );

  // ===== Pré-carregamento (atual / próxima / anterior) =====
  const preload = useCallback(async (src: string) => {
    try {
      const img = new Image();
      img.decoding = "async";
      img.loading = "eager";
      img.src = src;
      if (typeof img.decode === "function") await img.decode();
    } catch {
      /* ignora erros de rede/cache */
    }
  }, []);

  useEffect(() => {
    const cur = images.slice(start, start + itemsPerPage);
    const nextStart = ((page + 1) % pages) * itemsPerPage;
    const prevStart = ((page - 1 + pages) % pages) * itemsPerPage;
    const nxt = images.slice(nextStart, nextStart + itemsPerPage);
    const prv = images.slice(prevStart, prevStart + itemsPerPage);
    [...cur, ...nxt, ...prv].forEach((src) => preload(src));
  }, [images, itemsPerPage, page, pages, start, preload]);

  // ===== Fade-in por imagem (quando carregar) =====
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const handleLoaded = (src: string) =>
    setLoaded((m) => (m[src] ? m : { ...m, [src]: true }));

  // ===== A11y: teclado (setas) no container =====
  const rootRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (pages <= 1) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [go, pages]);

  // ===== Classes utilitárias das setas =====
  const arrowCommon =
    "absolute top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full border border-gray-200 bg-white shadow z-10 focus:outline-none focus:ring-2 focus:ring-teal-600/40";
  const arrowLeft = arrowsOutside ? "left-[-14px] md:-left-10" : "left-2 md:-left-10";
  const arrowRight = arrowsOutside ? "right-[-14px] md:-right-10" : "right-2 md:-right-10";

  // ===== Grid cols dinâmico (respeita perPage) – NUNCA undefined =====
  const gridStyle: CSSProperties =
    isMdUp ? { gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))` } : {};

  return (
    <div
      ref={rootRef}
      className="relative overflow-visible outline-none"
      role="region"
      aria-roledescription="carousel"
      aria-label="Galeria de imagens"
      tabIndex={0}
    >
      {/* SETAS */}
      {showArrows && pages > 1 && (
        <>
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => go(-1)}
            className={`${arrowCommon} ${arrowLeft}`}
          >
            ‹
          </button>

          <button
            type="button"
            aria-label="Próximo"
            onClick={() => go(1)}
            className={`${arrowCommon} ${arrowRight}`}
          >
            ›
          </button>
        </>
      )}

      {/* grade das imagens visíveis */}
      {/* no mobile damos um respiro lateral (mx-8) para as setas ficarem fora sem sobrepor a imagem */}
      <div className={arrowsOutside ? "mx-8 md:mx-0" : ""}>
        <div className="grid gap-6" style={gridStyle}>
          {visible.map((src, i) => (
            <figure
              key={`${src}-${i}`}
              className={`relative overflow-hidden rounded-3xl bg-gray-200 ${heightClass}`}
            >
              <img
                src={src}
                alt=""
                className={`h-full w-full object-cover select-none transition-opacity duration-200 ${
                  loaded[src] ? "opacity-100" : "opacity-0"
                }`}
                loading={page === 0 && i === 0 ? "eager" : "lazy"}
                fetchPriority={page === 0 && i === 0 ? "high" : "auto"}
                decoding="async"
                draggable={false}
                onLoad={() => handleLoaded(src)}
                onError={() => handleLoaded(src)}
                aria-hidden
              />
            </figure>
          ))}
        </div>
      </div>

      {/* bolinhas de paginação */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: pages }).map((_, i) => (
          <button
            key={i}
            aria-label={`Ir para página ${i + 1}`}
            aria-current={i === page ? "true" : undefined}
            onClick={() => setPage(i)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              i === page ? "bg-teal-600" : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .transition-opacity {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
