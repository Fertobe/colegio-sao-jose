// app/diferenciais/coc/head.tsx
export default function Head() {
  return (
    <>
      {/* Hero (acima da dobra) */}
      <link rel="preload" as="image" href="/coc/hero.webp" fetchPriority="high" />

      {/* Ícones dos pilares */}
      <link rel="preload" as="image" href="/coc/pilares/pilar1.webp" />
      <link rel="preload" as="image" href="/coc/pilares/pilar2.webp" />
      <link rel="preload" as="image" href="/coc/pilares/pilar3.webp" />

      {/* Ilustração de “Nossas soluções educacionais” */}
      <link rel="preload" as="image" href="/coc/solucoes.webp" />
    </>
  );
}
