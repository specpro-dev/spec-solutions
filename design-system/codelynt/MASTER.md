# CODELYNT Design System — Master

Dark-first single theme. Tone: modern, clean, premium. "Build · Innovate · Transform". No gold.

## Brand
- Name: CODELYNT (all caps in the logo), "Codelynt" in running copy.
- Assets: `public/brand/` (never edit or redraw). Component: `components/ui/Logo.tsx`.
- Wordmark is always an SVG image, never live text. No taglines inside the logo.

## Colors (CSS variables in `app/globals.css`, mirrored in `tailwind.config.ts`)
| Token | Value |
|---|---|
| --bg-base / surface / card / card-hover | #0B1020 / #0F1730 / #121A36 / #172145 |
| --accent / light / muted / accent-2 | #3B82F6 / #60A5FA / #1D4ED8 / #06B6D4 |
| --text-primary / secondary / muted | #F5F7FF / #A3B1CC / #6B7A99 |
| --border-subtle / accent | rgba(59,130,246,.14) / rgba(59,130,246,.40) |
| --gradient-brand | linear-gradient(135deg,#3B82F6,#06B6D4) |
Text-secondary on bg-base ≥ 4.5:1. Never use text-muted for body copy.

## Typography
Sora via next/font (`--font-sora`), weights 400/500/600/700. Section titles: 600, clamp(1.875rem, 4vw, 3rem), tight leading.

## Components (classes in globals.css)
- `.btn .btn-primary` gradient bg, white text, hover brightness + glow. `.btn-secondary` transparent, border-accent. 12px radius, ≥44px tall, 2px #60A5FA focus ring (offset 2px).
- `.card` bg-card, 1px border-subtle, 16px radius; hover border-accent, translateY(-2px), glow-blue. Disabled under reduced motion.
- `.eyebrow` uppercase, tracking .18em, xs, cyan. `.section-title`.
- `.icon-tile` 44px rounded-xl, bg-accent/10, lucide icon stroke 1.75, #60A5FA.
- `.hero-glow`, `.bg-grid`, `.text-gradient`. No gradients behind body text.

## Layout
Sections `py-20 md:py-28` (`.section-py`); container `max-w-7xl px-4 sm:px-6 lg:px-8`.
Order: NavBar, Hero, ProblemSolution, Services, Process, Portfolio, WhyUs, Team, Contact, Footer.

## Logo rules
- Navbar/footer: horizontal, onDark, 28px mobile / 32px md+. Loading screen: symbol.
- Clear space ≥ 0.5 × symbol height. Min size: horizontal 96px wide, symbol 16px.
- Do not stretch, recolor with CSS filters, add shadows, or place on busy backgrounds.

## Motion & a11y
Animate opacity/transform only; MotionWrapper bails out under prefers-reduced-motion. Visible focus on all controls; labels on all inputs.
