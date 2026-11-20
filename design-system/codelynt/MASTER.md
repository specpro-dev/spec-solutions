# CODELYNT Design System — Master

Black, white and the brand blue. Crisp white pages, true-black bands for contrast, blue as the one accent. Tone: modern, clean, confident — no glows, gradients or grid backgrounds. "Build · Innovate · Transform".

## Brand
- Name: CODELYNT (all caps in the logo), "Codelynt" in running copy.
- Assets: `public/brand/` (never edit or redraw). Component: `components/ui/Logo.tsx` (`on="light"` by default, `on="dark"` on black sections).
- Wordmark is always an SVG image, never live text. No taglines inside the logo.

## Colors (defined once in `config/theme.ts`)
Each palette becomes CSS variables: `:root` is light, and any element with `.theme-ink` (or `<Section tone="ink">`) switches its whole subtree to black. Components use the same token classes either way (`bg-bg-card`, `text-text-secondary`, `border-border-subtle`).

| Token | Light | Ink (black) |
|---|---|---|
| bg-base / surface / card / card-hover | #FFFFFF / #F4F5F7 / #FFFFFF / #F9FAFB | #0A0A0A / #0A0A0A / #141414 / #1C1C1C |
| text-primary / secondary / muted | #0A0A0A / #4B5563 / #9CA3AF | #FFFFFF / #A3A3A3 / #737373 |
| border-subtle / strong | #E5E7EB / #CBD0D8 | #262626 / #404040 |
| accent-text (blue text, thin icons) | #2563EB | #60A5FA |

Brand blue (same everywhere): `accent` #3B82F6 for marks and lines, `accent-strong` #2563EB for button fills (white text, AA), `accent-hover` #1D4ED8.

Where blue goes: primary buttons, eyebrows, icon tiles, the hero underline, check icons, the timeline progress line, team initials, required-field stars. Black bands: Why Us, the Process CTA card, the footer. Text-muted is for placeholders and fine print only.

## Typography
Sora via next/font (`--font-sora`), weights 400/500/600/700. Section titles: 600, clamp(1.875rem, 4vw, 3rem), tight leading.

## Components (classes in `app/globals.css`; React primitives in `components/ui/`)
- Icons: lucide-react only, stroke 1.75, `aria-hidden`. No text arrows (→, ↳). Exceptions: brand marks lucide doesn't ship (LinkedIn, WhatsApp) and the Codelynt logo.
- `.btn .btn-primary` the logo symbol's blue → cyan gradient one step deeper (`bg-gradient-button`, #2563EB → #0E7490, 135°) with white text, ≥5.2:1 across the gradient (the logo's exact cyan would only give 2.4:1). On hover a navy (#1E3A8A) pill slides in from the left and the icon nudges right. `.btn-secondary` card bg with border-strong, text-primary border on hover. 10px radius, ≥44px tall. Focus ring 2px accent-text.
- `.card` white, 1px border-subtle, 14px radius. Add `.card-interactive` for the hover lift (border-strong, soft neutral shadow, translateY(-2px); no lift under reduced motion).
- `.eyebrow` uppercase xs accent-text with a small accent dot. `.section-title`.
- `.icon-tile` 44px, accent/10 fill, accent-text lucide icon (stroke 1.75).
- `.text-link` underline that turns accent on hover.
- Black sections: wrap in `.theme-ink`; never hand-pick dark colors.

## Layout
Sections `py-20 md:py-28` (`.section-py`); container `max-w-7xl px-4 sm:px-6 lg:px-8`.
Order: NavBar, Hero, ProblemSolution, Services, Process, CaseStudies, WhyUs, Team, CtaBanner, Footer (the contact form lives on its own page at `/contact`).

## Logo rules
- Navbar: horizontal on-light, 28px mobile / 32px md+. Footer and black sections: horizontal on-dark. Loading screen: symbol.
- Clear space ≥ 0.5 × symbol height. Min size: horizontal 96px wide, symbol 16px.
- Do not stretch, recolor with CSS filters, add shadows, or place on busy backgrounds.

## Motion & a11y
Animate opacity/transform only via `components/ui/Reveal.tsx` (`Reveal`, `RevealGroup`/`RevealItem`), which bails out under prefers-reduced-motion. In-page links use `SectionLink`; section ids and labels live in `config/site.ts`. Visible focus on all controls; labels on all inputs.
