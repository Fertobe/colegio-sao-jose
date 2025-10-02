// app/ensino/ensino-medio/head.tsx
export default function Head() {
  return (
    <>
      {/* Preload do hero (mobile e desktop) */}
      <link
        rel="preload"
        as="image"
        href="/ensino/medio/mobile/hero.webp"
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/ensino/medio/hero.webp"
        media="(min-width: 768px)"
        fetchPriority="high"
      />
    </>
  );
}

