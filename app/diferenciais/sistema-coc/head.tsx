// app/diferenciais/coc/head.tsx
export default function Head() {
  return (
    <>
      {/* Preload da imagem hero (acima da dobra) */}
      <link
        rel="preload"
        as="image"
        href="/coc/hero.webp"
        fetchPriority="high"
      />
    </>
  );
}
