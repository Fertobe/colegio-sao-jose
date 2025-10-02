// app/ensino/educacao-infantil/head.tsx
export default function Head() {
  return (
    <>
      {/* Preload das imagens de hero (uma para mobile, outra para md+) */}
      <link
        rel="preload"
        as="image"
        href="/ensino/infantil/mobile/hero.webp"
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/ensino/infantil/hero.webp"
        media="(min-width: 768px)"
        fetchPriority="high"
      />
    </>
  );
}
