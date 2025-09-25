"use client";

import { useEffect, useMemo, useState } from "react";

type Slide = { src: string; alt: string };

export default function Carousel({
  images,
  interval = 6000,
  heightClass = "min-h-[520px] h-[75vh] md:h-[85vh]"
}: {
  images: Slide[];
  interval?: number;
  heightClass?: string;
}) {
  const slides = useMemo(() => images, [images]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => clearInterval(id);
  }, [slides.length, interval]);

  if (!slides.length) return null;

  const go = (dir: "prev" | "next" | number) => {
    if (dir === "prev") setIndex((i) => (i - 1 + slides.length) % slides.length);
    else if (dir === "next") setIndex((i) => (i + 1) % slides.length);
    else setIndex(dir);
  };

  return (
    <div className={`relative w-full overflow-hidden ${heightClass}`}>
      {/* imagens em fade */}
      <div
        className="relative h-full w-full"
        aria-roledescription="carousel"
        aria-label="Fotos do colégio"
      >
        {slides.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>

      {/* setas + paginação (agora branco sólido para máximo contraste) */}
      <div className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 flex items-center gap-3">
        <button
          type="button"
          onClick={() => go("prev")}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white bg-white text-brand-600 shadow hover:brightness-95"
          aria-label="Slide anterior"
        >
          ‹
        </button>

        <div className="pointer-events-auto rounded-full border border-white bg-white px-4 py-2 shadow">
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Ir para o slide ${i + 1}`}
                onClick={() => go(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === index
                    ? "bg-brand-600 ring-2 ring-brand-600/20"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => go("next")}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white bg-white text-brand-600 shadow hover:brightness-95"
          aria-label="Próximo slide"
        >
          ›
        </button>
      </div>
    </div>
  );
}
