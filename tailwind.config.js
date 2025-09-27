/** @type {import('tailwindcss').Config} */

// Deixa robusto: só usa o plugin se ele estiver instalado
const tryRequire = (name) => { try { return require(name); } catch { return null; } };
const typography = tryRequire('@tailwindcss/typography');

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}" // varre os .md de notícias (opcional)
  ],
  theme: {
    extend: {
      colors: {
        // Paleta acessível baseada no #05597A
        brand: {
          50:  "#E5F3F8",
          100: "#CCE7F1",
          200: "#99CFE3",
          300: "#66B7D5",
          400: "#339FC7",
          500: "#0B86B0",
          600: "#05597A", // principal
          700: "#04465F",
          800: "#033344",
          900: "#022029"
        },
        accent: { 500: "#05597A" }
      },

      // Variante "prose-brand" (sintaxe CORRIGIDA)
      typography: (theme) => ({
        brand: {
          css: {
            '--tw-prose-body': theme('colors.brand.800'),
            '--tw-prose-headings': theme('colors.brand.900'),
            '--tw-prose-lead': theme('colors.brand.700'),
            '--tw-prose-links': theme('colors.brand.700'),
            '--tw-prose-bold': theme('colors.brand.900'),
            '--tw-prose-bullets': theme('colors.brand.400'),
            '--tw-prose-hr': theme('colors.brand.200'),
            '--tw-prose-quotes': theme('colors.brand.900'),
            '--tw-prose-quote-borders': theme('colors.brand.300'),
            '--tw-prose-captions': theme('colors.brand.700'),
            '--tw-prose-code': theme('colors.brand.800'),
            '--tw-prose-pre-code': theme('colors.brand.100'),
            '--tw-prose-pre-bg': theme('colors.brand.900'),
            '--tw-prose-th-borders': theme('colors.brand.300'),
            '--tw-prose-td-borders': theme('colors.brand.200'),
          }
        }
      }),
    },
  },

  // Se o plugin existir, usa. Se não existir, segue sem ele (sem quebrar o build)
  plugins: [typography].filter(Boolean),
};
