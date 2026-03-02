# Store Plan — Inoki México
(Auto-actualizado por Lovivo AI)

## Current State
Tienda de baños de té artesanales inspirada en Inoki Bathhouse, para el mercado mexicano. Homepage completamente construida con diseño luxury wellness. Página de producto rediseñada completamente al estilo Inoki.

## Brand
- **Nombre:** Inoki México
- **Concepto:** Baños de té artesanales con hierbas 100% naturales para el mercado mexicano
- **Inspiración:** inokibathhouse.com — estética luxury spa, verde selva, crema cálido

## Design System
- **Fuentes:** Playfair Display (headings, serif), Inter (body, light)
- **Primary:** HSL(155, 55%, 18%) — verde selva profundo
- **Background:** HSL(38, 33%, 96%) — crema cálido/marfil
- **Accent:** HSL(38, 65%, 52%) — dorado cálido
- **Border radius:** 0.25rem (casi cuadrado, estética minimalista)
- **Google Fonts:** importados en index.css

## Products Created
1. **Set Descubrimiento — Baños de Té** (ID: 81244754-3a84-46e2-9ced-fb1e5ee1b25b) — $649 (compare $799) — featured
2. **Baño de Té Lavanda & Manzanilla** (ID: f9e5918f-f565-4cdf-9e1d-8cdb8111bf66) — $249 (variantes: 1, caja 4, caja 8)
3. **Baño de Té Menta & Eucalipto** (ID: a36ae2e0-5438-45dc-8b32-8850c3ecba4e) — $249
4. **Baño de Té Rosa & Jazmín** (ID: 14bd3a73-0edc-4343-9267-9cc178200453) — $279
5. **Baño de Té Jengibre & Limón Detox** (ID: 23f8acaa-c859-45af-bec5-732121dcdc74) — $249

## Collections Created
- **Baños de Té** (ID: 3c6973ba-fad9-4bee-8590-40402d9c0cef) — 4 productos
- **Sets & Rituales** (ID: 83d63836-f4e5-4e00-980c-354f31f8a42a) — 1 producto

## Files Modified
- `src/index.css` — nuevo design system, Google Fonts, animations
- `tailwind.config.ts` — keyframes fade-up, fade-in
- `src/templates/EcommerceTemplate.tsx` — header con announcement bar, nav, footer verde selva
- `src/templates/PageTemplate.tsx` — removed py-6 for full-width, removed border-t bg-muted from footer
- `src/components/BrandLogoLeft.tsx` — logo actualizado
- `src/pages/ui/IndexUI.tsx` — hero fullbleed, feature banner, brand story, colecciones, newsletter
- `src/components/CollectionCard.tsx` — overlay style con hover
- `src/components/ui/ProductCardUI.tsx` — estilo luxury con hover effects
- `src/components/NewsletterSection.tsx` — sección verde selva con estética Inoki
- `src/pages/ui/ProductPageUI.tsx` — COMPLETAMENTE REDISEÑADO al estilo Inoki

## ProductPageUI Sections (nueva estructura)
1. **Breadcrumb** — Inicio / Tienda / Producto
2. **Hero 2-col** — galería de imágenes (main + thumbnails) | detalles (título Playfair grande, estrellas, precio, variantes, qty, CTA verde, trust badges)
3. **Botánicos** — emojis circulares dinámicos basados en el nombre del producto (lavanda, manzanilla, etc.)
4. **Cómo Usar** — 3 pasos numerados con descripción
5. **Por qué Inoki** — franja verde selva con 4 pilares (Natural, Artesanal, México, Eco-friendly)
6. **Sticky CTA bar** — aparece al hacer scroll, desaparece cuando los botones están en pantalla

## Public Images
- `/hero.webp` — Hero fullbleed (tina botanica)
- `/feature-banner.webp` — Feature section (manos con bolsita)
- `/brand-story.webp` — Sección "Nuestra Historia" (mujer en tina)
- `/logo.png` — Logo Inoki con loto

## Active Plan: Next Sessions
- [ ] Página de colección dedicada
- [ ] Página de blog con artículos de bienestar
- [ ] Agregar testimonios/reviews section en homepage
- [ ] Barra de prensa ("Como se vio en...")
- [ ] Configurar Stripe para pagos México (MXN)
- [ ] CartUI y CheckoutUI estilizados al mismo nivel luxury

## User Preferences
- Español para mercado mexicano
- Estética: luxury spa, botanica, minimalista
- Colores: verde selva + crema + dorado
- Tipografía: Playfair Display serif + Inter light
- Referencia principal: inokibathhouse.com