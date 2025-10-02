// app/ensino/ensino-fundamental/head.tsx
export default function Head() {
  return (
    <>
      {/* Preload das imagens do hero (mobile e desktop) */}
      <link
        rel="preload"
        as="image"
        href="/ensino/fundamental/mobile/hero.webp"
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/ensino/fundamental/hero.webp"
        media="(min-width: 768px)"
        fetchPriority="high"
      />
    </>
  );
}
