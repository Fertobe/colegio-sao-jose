"use client";

import { useEffect, useMemo, useState } from "react";

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
  // Detecta breakpoint md (>=768px) para decidir quantos itens por página
  const [isMdUp, setIsMdUp] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const handle = (e: any) => setIsMdUp(e.matches);
    handle(mql);
    // compat com browsers antigos/novos
    if (mql.addEventListener) mql.addEventListener("change", handle);
    else mql.addListener(handle);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", handle);
      else mql.removeListener(handle);
    };
  }, []);

  const itemsPerPage = isMdUp ? perPage : perPageMobile;
  const pages = Math.max(1, Math.ceil(images.length / itemsPerPage));
  const [page, setPage] = useState(0);

  useEffect(() => {
    // se mudar o número de páginas, evita ficar numa página inválida
    if (page > pages - 1) setPage(0);
  }, [pages, page]);

  const visible = useMemo(() => {
    const start = page * itemsPerPage;
    return images.slice(start, start + itemsPerPage);
  }, [images, page, itemsPerPage]);

  const go = (dir: number) => setPage((p) => (p + dir + pages) % pages);

  // classes para posicionar setas fora da imagem no mobile
  const arrowCommon =
    "absolute top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow z-10";
  const arrowLeft = arrowsOutside
    ? "left-[-14px] md:-left-10"
    : "left-2 md:-left-10";
  const arrowRight = arrowsOutside
    ? "right-[-14px] md:-right-10"
    : "right-2 md:-right-10";

  return (
    <div className="relative overflow-visible">
      {/* SETAS */}
      {showArrows && pages > 1 && (
        <>
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => go(-1)}
            className={`flex ${arrowCommon} ${arrowLeft}`}
          >
            ‹
          </button>

          <button
            type="button"
            aria-label="Próximo"
            onClick={() => go(1)}
            className={`flex ${arrowCommon} ${arrowRight}`}
          >
            ›
          </button>
        </>
      )}

      {/* grade das imagens visíveis */}
      {/* no mobile damos um respiro lateral (mx-8) para as setas ficarem fora sem sobrepor a imagem */}
      <div className={arrowsOutside ? "mx-8 md:mx-0" : ""}>
        <div className={`grid gap-6 ${isMdUp ? "md:grid-cols-3" : ""}`}>
          {visible.map((src, i) => (
            <figure
              key={`${src}-${i}`}
              className={`relative overflow-hidden rounded-3xl bg-gray-200 ${heightClass}`}
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover select-none"
                loading="lazy"
                draggable={false}
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
            onClick={() => setPage(i)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              i === page ? "bg-teal-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
