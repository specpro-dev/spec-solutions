# SPEC SOLUTIONS — COMPLETE SITE BUILD PROMPT
> Paste this entire document into Claude Code, Cursor, or any capable AI coding agent with Claude Code / Cursor + the installed skills.
> Intended agent: Claude Code with ui-ux-pro-max-skill and taste-skill installed globally.

---

## 0. MANDATORY SKILL BOOTSTRAP — RUN THESE FIRST, BEFORE TOUCHING ANY CODE

Before writing a single line of component code, run the following search queries to generate the project design system. Do not skip this. The output from these commands defines every visual decision downstream.

```bash
# Step 1 — Generate full design system for the project
python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py \
  "premium software agency dark tech precision engineering" \
  --design-system --persist -p "Spec Solutions" --page "landing" -f markdown

# Step 2 — Style intelligence for the dark + gold tech brand direction
python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py \
  "dark mode glassmorphism minimalism engineering precision" \
  --domain style

# Step 3 — UX rules for single-page marketing site
python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py \
  "conversion landing page scroll animation trust hierarchy" \
  --domain ux

# Step 4 — Next.js-specific stack rules
python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py \
  "performance LCP animation scroll reveal section transition" \
  --stack nextjs

# Step 5 — Portfolio section specifics
python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py \
  "portfolio card case study bento grid agency" \
  --domain ux --stack nextjs
```

Save the combined output as `design-system/MASTER.md`. Every component must reference this file before being written.

---

## 1. TASTE-SKILL GLOBAL DIALS — LOCK THESE VALUES

Apply the taste-skill framework at these exact settings across every section of the site:

```
DESIGN_VARIANCE:   7   (distinctive asymmetry without chaos — premium agency, not artsy startup)
MOTION_INTENSITY:  6   (fluid CSS transitions + targeted Framer Motion reveals — NOT cinematic)
VISUAL_DENSITY:    3   (art-gallery breathing room — expensive whitespace, not empty page)
```

### Taste-Skill Non-Negotiables

- **Typography**: Do NOT use Inter. Use Plus Jakarta Sans (already in stack) for body + headings. For display/eyebrow accents, pair with a geometric mono (`JetBrains Mono` or `Space Mono`, self-hosted) for any code-flavoured labels or metric callouts.
- **Hero discipline**: Max 4 text elements total. Eyebrow → H1 (max 3 lines, never 4) → sub-copy (1 sentence max) → CTAs. H1 font-size: `clamp(2.75rem, 5vw, 5rem)`. Container: `max-w-5xl`.
- **Hero top padding cap**: `pt-20` maximum at desktop. No floating-in-space hero.
- **Section spacing**: `py-28 md:py-36` between sections. Sections feel like cinematic chapters.
- **Layout**: CSS Grid over flex-math. `grid-cols-1 md:grid-cols-N gap-8`. Never `w-[calc(33%-1rem)]`.
- **Mobile**: Every asymmetric layout above `md:` collapses to strict single-column (`w-full px-4`) on viewports < 768px.
- **Viewport height**: `min-h-[100dvh]` for hero. Never `h-screen`.
- **Viewport container**: `max-w-7xl mx-auto px-6` on all sections.
- **Anti-slop enforcement**: No gradient-border cards as the primary card pattern. No floating-blob backgrounds. No generic "3 icons in a row" feature lists. Every layout decision must earn its place.

---

## 2. PROJECT IDENTITY — SPEC SOLUTIONS

### Company Context
**Spec Solutions** is a boutique software engineering studio. The name signals precision: engineering to specification. The brand language is: structured, technical, trustworthy, quietly confident. Not flashy. Not startup-ey. The kind of agency that a CFO or operations director would trust with a mission-critical system.

### Brand Token Overrides
Update `globals.css` and `tailwind.config.ts` to use these tokens (replace the NextIntake palette entirely):

```css
:root {
  /* Primary backgrounds */
  --bg-base:        #080C14;   /* Near-black, deep navy-charcoal */
  --bg-surface:     #0D1420;   /* Section alternate bg */
  --bg-card:        #111827;   /* Card backgrounds */
  --bg-card-hover:  #161F2E;   /* Card hover state */

  /* Accent — precision gold/amber */
  --accent:         #C8972F;   /* Primary accent — CTAs, highlights */
  --accent-light:   #D9AA50;   /* Hover, glow */
  --accent-muted:   #9A7124;   /* Subdued use — dividers, subtle labels */

  /* Text */
  --text-primary:   #F0F4F8;   /* Headlines */
  --text-secondary: #8FA3BF;   /* Body, descriptions */
  --text-muted:     #4A637D;   /* Labels, metadata, captions */

  /* Borders */
  --border-subtle:  rgba(200, 151, 47, 0.12);  /* Card borders */
  --border-accent:  rgba(200, 151, 47, 0.35);  /* Focused/hover borders */

  /* Functional */
  --gold:           #C8972F;   /* Alias for legacy compatibility */
  --gold-light:     #D9AA50;
  --navy:           #080C14;
  --navy-light:     #0D1420;
  --navy-dark:      #050810;
}
```

### Logo
Replace `Logo.tsx`. The Spec Solutions logo is a wordmark + monogram system:
- **Monogram**: `SS` with the two S letterforms interlocked or geometrically stacked — rendered as an inline SVG with `--accent` fill.
- **Wordmark**: "SPEC" in `font-weight: 700` tracking-widest uppercase, "SOLUTIONS" in `font-weight: 400` tracking-wider, slightly smaller — both in `--text-primary`.
- Provide both a horizontal lockup (nav) and a stacked lockup (footer).

---

## 3. TECH STACK — CONFIRMED

| Layer | Version | Notes |
|---|---|---|
| Framework | Next.js 14.2.29 (App Router) | ⚠️ Critical RSC CVEs exist in 14.x — add `X-Content-Type-Options`, `X-Frame-Options`, and CSP headers in `next.config.ts`. Upgrade path to 15.x is recommended post-launch. |
| Language | TypeScript 5 | Strict mode enabled |
| Styling | Tailwind CSS 3 + CSS custom properties | Use `@layer utilities` for token-based classes |
| Animation | Framer Motion 11 (primary) + CSS transitions | See Section 5 for component-specific animation source |
| Email | Resend 3 | `/api/contact` route |
| Font | Plus Jakarta Sans + JetBrains Mono | Both self-hosted via `next/font/google` |
| Analytics | GA4 via `gtag` | Deferred, non-blocking |
| Deployment | Vercel Edge Network | |

---

## 4. PROJECT STRUCTURE — ADAPTED FOR SPEC SOLUTIONS

```
spec-solutions/
├── app/
│   ├── layout.tsx            # Root layout — metadata, fonts, GA4, WhatsApp FAB
│   ├── page.tsx              # Assembles all sections in order
│   ├── globals.css           # Design tokens, Tailwind base overrides
│   ├── robots.ts             # Dynamic robots.txt
│   └── sitemap.ts            # Dynamic sitemap.xml
│   api/
│   └── contact/
│       └── route.ts          # Resend lead capture
├── components/
│   ├── sections/
│   │   ├── Hero.tsx              # NO ANIMATIONS (LCP protection)
│   │   ├── TrustBar.tsx          # Logo ticker / social proof bar
│   │   ├── Services.tsx          # What Spec Solutions builds
│   │   ├── ProblemSolution.tsx   # 3-card problem/solution
│   │   ├── Portfolio.tsx         # Work showcase
│   │   ├── Process.tsx           # How we work (numbered steps)
│   │   ├── WhyUs.tsx             # Differentiators
│   │   ├── Team.tsx              # Founders
│   │   └── Contact.tsx           # Lead capture
│   ├── ui/
│   │   ├── NavBar.tsx            # Sticky + scroll-blur
│   │   ├── Logo.tsx              # SS wordmark SVG
│   │   ├── MotionWrapper.tsx     # Framer Motion fade-in (below-fold only)
│   │   ├── SplitText.tsx         # ReactBits text reveal (below-fold only)
│   │   ├── GradientText.tsx      # ReactBits gradient text
│   │   ├── ShinyText.tsx         # ReactBits shiny text for CTAs
│   │   └── WhatsAppButton.tsx    # Fixed FAB
│   └── analytics/
│       └── Analytics.tsx         # GA4 deferred loader
├── lib/
│   └── analytics.ts              # trackEvent() helper
├── design-system/
│   └── MASTER.md                 # Output of ui-ux-pro-max skill (generated in Step 0)
├── public/
│   ├── favicon.svg
│   ├── mockup-web-app.png        # Placeholder — replace before launch
│   └── mockup-automation.png     # Placeholder — replace before launch
└── ...config files
```

---

## 5. ANIMATION STRATEGY — SECTION-BY-SECTION ASSIGNMENT

**Prime directive**: Lighthouse 95+ is non-negotiable. Every animation decision must be justified against this constraint. The hero has zero JS animations. Everything below the fold uses `IntersectionObserver`-gated Framer Motion or CSS-only transitions.

### Source mapping

| Source | Install method | Use for |
|---|---|---|
| **ReactBits** (`reactbits.dev`) | `npx jsrepo add https://reactbits.dev/<variant>/<component>` | Text reveals, background effects, shiny/gradient text, cursor effects |
| **21st.dev** | Copy component code from `21st.dev/community/components/s/<category>` | Hero section patterns, card hover effects, navbar blur, scroll animations |
| **Framer Motion 11** | Already in package.json | Section entrances, stagger lists, layout transitions |
| **CSS Transitions** | In `globals.css` | Hover states, color transitions, border glows — `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)` |

### Per-Section Animation Spec

#### NavBar
- **Source**: CSS only — `backdrop-filter: blur(12px)` + `border-bottom: 1px solid var(--border-subtle)` on scroll
- Scroll detection: `rAF`-throttled. Add `will-change: transform` on the nav element.
- Transition: `opacity` + `background-color` only — `0.2s ease-out`

#### Hero (Section 1) — ZERO JS ANIMATIONS
- Static radial CSS gradient background: `radial-gradient(ellipse 80% 50% at 50% -10%, rgba(200, 151, 47, 0.15) 0%, transparent 60%)`
- Subtle animated noise/grain texture: **CSS `@keyframes` only** — a `background-position` shift on a repeating SVG noise pattern. No JS, no canvas.
- Optional: a `::before` pseudo-element with a slow-rotating conic gradient at 0.2 opacity — pure CSS, zero layout impact.
- H1 is naked text. No reveal animation. No stagger. LCP is king.

#### TrustBar (Section 2) — Social proof ticker
- **Source**: 21st.dev — use the `Marquee` / infinite scrolling logo ticker pattern
- CSS `animation: scroll linear infinite` — no JS
- Simple technology logos / client type labels: "Web Applications · Automation Systems · Custom Portals · API Integrations"

#### Services (Section 3)
- **Source**: Framer Motion `staggerChildren` on card grid
- Each card: `initial={{ opacity: 0, y: 24 }}` → `animate={{ opacity: 1, y: 0 }}` on viewport entry
- Card hover: `transform: translateY(-4px)` + border glow (`box-shadow: 0 0 0 1px var(--border-accent), 0 8px 32px rgba(200, 151, 47, 0.08)`) — CSS only
- **Source**: ReactBits `GlowingCard` or equivalent border-glow pattern

#### ProblemSolution (Section 4)
- **Source**: Framer Motion entrance — `whileInView` with `once: true`
- Gold divider between problem and solution: animated width expansion `scaleX: 0 → 1` on entry

#### Portfolio (Section 5)
- **Source**: 21st.dev — browse `21st.dev/community/components/s/card` for a tilt/perspective hover card
- Each card gets a `perspective-1000` container with `rotateX` and `rotateY` on mouse-move (client component, `'use client'`)
- Mockup image lazy-loads with `next/image` + blur placeholder
- Badge ("Web App" / "Automation") uses ReactBits `ShinyText` component

#### Process (Section 6) — How We Work
- Layout: vertical timeline with numbered steps (01–04) connected by a growing vertical line
- **Source**: Framer Motion `useInView` — each step fades in with a 150ms stagger
- The connecting line animates `height: 0% → 100%` as the section scrolls into view — use Framer Motion `useScroll` + `scaleY` on a `transformOrigin: top` element

#### WhyUs (Section 7)
- Layout: 4 numbered differentiator rows separated by `--border-subtle` dividers
- **Source**: Framer Motion `staggerChildren` — each row slides in from left `x: -16 → 0`
- Number label uses ReactBits `GradientText` with a `--accent` to `--accent-light` gradient

#### Team (Section 8)
- **Source**: Framer Motion `whileInView` entrance, `scale: 0.96 → 1`
- Avatar: circular image with `--accent` ring on hover, `box-shadow: 0 0 0 2px var(--accent)` — CSS only

#### Contact (Section 9)
- Form fields: `focus:border-[var(--accent)]` + subtle glow `box-shadow: 0 0 0 3px rgba(200, 151, 47, 0.15)` — CSS only
- Submit button: ReactBits `ShinyText` wrapper OR a CSS shimmer `@keyframes` scan effect
- No JS animations on the form — just CSS focus states

---

## 6. PAGE SECTIONS — COMPLETE SPEC FOR SPEC SOLUTIONS

### Section 1: NavBar
- Logo left (horizontal SS lockup)
- Navigation links (desktop only, hidden mobile): Services · Work · Process · Team
- Single CTA right: **"Book a Discovery Call"** → `#contact` — styled as a small outlined button with `--accent` border, `--accent` text, hover fills solid gold
- Mobile: hamburger → full-height slide-in overlay menu (Framer Motion `AnimatePresence` + `x: "100%" → 0`)

### Section 2: Hero (`#hero`)
- **Eyebrow**: `< Engineering to Specification />` — monospace font, `--accent` color, small uppercase
- **H1**: `"We Build Software That Performs."` — 5 words, never wraps past 2 lines. Secondary line variation: `"Precisely. Measurably. On Spec."`
- **Sub-copy**: One sentence: "Custom-coded web applications, booking systems, and automation — engineered for businesses that can't afford to guess."
- **CTAs**: "Book a Discovery Call" (primary, `--accent` background) + "See Our Work" (ghost, `--border-accent` border) → `#portfolio`
- **Trust strip** below CTAs (text only, no numbers we can't verify): `Custom-Coded · Lighthouse 95+ · Vercel Edge · No Templates`
- Background: dark radial gradient + slow CSS grain texture (see animation spec above)
- **NO JS ANIMATIONS HERE**

### Section 3: TrustBar
- Infinite marquee of service labels or tech stack badges
- Labels: "React & Next.js" · "Node.js & APIs" · "PostgreSQL" · "Booking Systems" · "Lead Capture" · "Automation Pipelines" · "Vercel Edge" · "TypeScript"
- Fade masks on left/right edges with `--bg-base` → transparent gradients
- Alternate section background: `--bg-surface`

### Section 4: Services (`#services`)
- **Heading**: "What We Build"
- **Sub-heading**: "Every engagement starts with your specification. We engineer to it."
- **3-column card grid** (1-col mobile):
  1. **Web Applications** — Custom portals, registration systems, booking platforms. Coded to your process, not adapted from a theme.
  2. **Automation Systems** — Lead pipelines, appointment flows, notification systems. Manual tasks replaced with reliable logic.
  3. **Performance Audits** — Existing site running slow, leaking leads, or costing you on ads? We find the breaks and fix them with evidence.
- Each card: icon (Lucide or Phosphor) + heading + body + a `→ Learn more` ghost link (scrolls to contact with pre-filled Goal field — use URL hash or query param)

### Section 5: ProblemSolution (`#problems`)
- **Heading**: "Why Most Business Websites Fail"
- **3-card grid** (1-col mobile):
  1. **Problem**: Leads fall through after hours — your contact form sends to a mailbox no one checks at 11 PM. **Solution**: Automated lead capture with instant WhatsApp/email notification routing.
  2. **Problem**: A slow site loses the client before a single word is read — 3-second load times on mobile cost you the click. **Solution**: Custom-coded, Lighthouse-optimised builds. No bloated plugins, no dead weight.
  3. **Problem**: Template sites look like every competitor — you can't charge a premium if your site signals generic. **Solution**: Designed and coded from specification. No templates. No compromise on identity.
- Card structure: gold-bordered top accent, problem (darker type), gold divider line, solution (lighter type, gold label "SPEC FIX")

### Section 6: Portfolio (`#portfolio`)
- **Heading**: "Selected Work"
- **Sub-heading**: "Concept designs built to demonstrate what precision engineering looks like in practice."
- **2-card grid** (1-col mobile, 2-col `lg:`):
  1. **Card 1 — "MedFlow Clinic Portal"**: Online booking + patient intake system for a specialist clinic. Badge: `Concept Design · Healthcare`. Bullets: (a) Reduces front-desk call volume by handling appointment scheduling online. (b) Patient intake form captures structured data before the visit. (c) Admin dashboard shows day-view, cancellations, and patient notes.
  2. **Card 2 — "AcademiQ — Student Registration Platform"**: Course enrollment and fee management system for a private tuition centre. Badge: `Concept Design · Education`. Bullets: (a) Eliminates WhatsApp-based enrollment chaos with a structured portal. (b) Automated payment confirmation emails on successful registration. (c) Admin view exports enrollment lists as CSV for reporting.
- Mockup images: `next/image`, `sizes="(max-width: 768px) 100vw, 50vw"`, explicit width/height, `placeholder="blur"`, `blurDataURL` generated.
- ⚠️ Placeholder images `/public/mockup-clinic.png` and `/public/mockup-education.png` — add real mockups before launch.

### Section 7: Process (`#process`)
- **Heading**: "How We Work"
- **Layout**: Vertical numbered timeline, `01` through `04`, each step separated by an animated connecting line
- **Steps**:
  - `01 Discovery` — We start with your business process, not a template. One video call, one shared doc, one clear spec.
  - `02 Specification` — Before any code is written, you get a written technical specification. You approve it. We build it.
  - `03 Build` — Development in two-week sprints. You see progress every week — no black box.
  - `04 Launch & Handover` — Deployed to Vercel, domain configured, analytics live. Plus a recorded walkthrough of your new system.

### Section 8: WhyUs (`#why-us`)
- **Heading**: "Why Spec Solutions"
- **Layout**: 4 numbered rows (01–04), separated by `--border-subtle` horizontal dividers — NO generic 3-icon grid
- **Items**:
  - `01 Custom-Coded, Not Configured` — Every line of code serves a purpose defined in your spec. Nothing inherited from a theme marketplace.
  - `02 Performance Is Measurable` — Lighthouse 95+ is a constraint we engineer to, not a metric we check at the end. We show you the score before you sign off.
  - `03 We Build for Your Operations` — Integrations with WhatsApp, Google Calendar, payment gateways, and CRMs. We map to your workflow, not a demo workflow.
  - `04 No Plugin Risk` — No WordPress vulnerability surface. No plugin update that breaks your site at 2 AM. Pure Next.js on Vercel Edge.

### Section 9: Team (`#team`)
- **Heading**: "The Team"
- **Sub-copy**: "Two engineers. One goal: software that does exactly what it was built to do."
- **2-card grid** (1-col mobile, 2-col `md:`):
  - ⚠️ Both founder cards are PLACEHOLDER — replace all of: name, role, credentials, bio, LinkedIn URL, headshot image
  - Card structure: circular headshot (SVG initial placeholder until real photo), name, role, 2-line bio, LinkedIn link
  - Avatar placeholder: SVG with `--bg-card` background, `--accent` initial letter, `fill="currentColor"`

### Section 10: Contact (`#contact`)
- **Heading**: "Start with a Conversation"
- **Sub-copy**: "Tell us what you need to build. We'll tell you if it fits what we do — and exactly what it would take."
- **Form fields**: Name · Business Name · Phone · Goal (dropdown)
- **Goal options** (updated for Spec Solutions):
  - "Build a booking or registration system"
  - "Replace or upgrade an existing site"
  - "Set up an automation or lead capture system"
  - "Get a performance audit of my current site"
  - "Something else — I'll explain"
- Success state: animated checkmark (`Framer Motion` `pathLength: 0 → 1` SVG stroke), message: "Received. We'll be in touch within one business day."
- Error state: red border + inline error text — no silent failures
- Alongside form: direct contact panel with email, phone/WhatsApp, and location
- ⚠️ Replace placeholder email, phone, and WhatsApp number before launch

### Footer
- Left: SS stacked logo + "Spec Solutions" wordmark
- Center: Quick links (Services · Work · Process · Contact)
- Right: Copyright + location "Kalutara & Colombo, Sri Lanka"
- Bottom rule: `"Custom-coded. Not a template. Not a guess."`
- Background: `--navy-dark` (`#050810`)

---

## 7. API ROUTE — `/api/contact`

```typescript
// Receives: { name, businessName, phone, goal }
// Validates all fields server-side (no client-only validation)
// Sends via Resend to CONTACT_TO_EMAIL
// Returns: 200 { success: true } or 500 { error: string }
// Rate limit: 3 submissions per IP per hour (use a simple in-memory store or Upstash Redis)
// Honeypot field: include a hidden `website` field — if populated, return 200 silently (spam trap)
```

---

## 8. SEO METADATA — `layout.tsx`

```typescript
export const metadata: Metadata = {
  title: 'Custom Software Development for Businesses in Sri Lanka | Spec Solutions',
  description: 'Spec Solutions builds custom web applications, booking systems, and automation tools for businesses in Sri Lanka. Custom-coded, Lighthouse 95+, no templates. Based in Kalutara & Colombo.',
  keywords: [
    'custom software development Sri Lanka',
    'web application development Kalutara',
    'booking system Sri Lanka',
    'custom website Sri Lanka',
    'Next.js developer Sri Lanka',
    'automation system Sri Lanka',
    'Colombo web developer',
    'custom coded website Sri Lanka',
  ],
  openGraph: {
    locale: 'en_LK',
    type: 'website',
    siteName: 'Spec Solutions',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Spec Solutions — Custom Software for Sri Lankan Businesses' }],
  },
  twitter: { card: 'summary_large_image' },
}
```

---

## 9. PERFORMANCE CONSTRAINTS — NON-NEGOTIABLE

1. **Hero LCP element**: The H1 is the LCP target. It must be rendered server-side, unstyled of transitions, and have `fetchpriority="high"` on the font.
2. **All ReactBits components** are `'use client'` — gate them behind a `dynamic(() => import(...), { ssr: false })` wrapper for any component that uses `window` or `document`.
3. **Framer Motion**: Import only `{ motion, AnimatePresence, useInView, useScroll, useTransform }` — never `import * as motion`. Use `LazyMotion` + `domAnimation` features package for below-fold sections.
4. **Images**: All `next/image` with explicit `width` and `height`. Hero has no `<img>` tags. Portfolio mockups are `loading="lazy"` with `placeholder="blur"`.
5. **Fonts**: Both Plus Jakarta Sans and JetBrains Mono loaded via `next/font/google` with `display: swap` and `preload: true`. Zero external CDN calls at runtime.
6. **Animation kill-switch**: Every Framer Motion animation must check `prefers-reduced-motion`. Wrap all motion components with:
   ```tsx
   const prefersReduced = useReducedMotion();
   // Pass prefersReduced to animate props — static fallback always defined
   ```
7. **Bundle**: Run `@next/bundle-analyzer` after build. Total client JS budget: < 180KB gzipped.
8. **Core Web Vitals targets**: LCP < 2.0s · CLS < 0.05 · FID/INP < 100ms

---

## 10. REACTBITS COMPONENTS — INSTALL COMMANDS

Run these in the project root to add the specific ReactBits components used in this build:

```bash
# Text animations (used in section headings below fold)
npx jsrepo add https://reactbits.dev/ts/tailwind/TextAnimations/SplitText
npx jsrepo add https://reactbits.dev/ts/tailwind/TextAnimations/GradientText
npx jsrepo add https://reactbits.dev/ts/tailwind/TextAnimations/ShinyText
npx jsrepo add https://reactbits.dev/ts/tailwind/TextAnimations/BlurText

# Background effects (hero section CSS-only, but these for alternate sections)
npx jsrepo add https://reactbits.dev/ts/tailwind/Backgrounds/Aurora

# UI components
npx jsrepo add https://reactbits.dev/ts/tailwind/Components/GlowingCard
npx jsrepo add https://reactbits.dev/ts/tailwind/Components/AnimatedContent
```

Usage rules:
- `SplitText` — Services section heading only. `delay={80}` per character. `whileInView` gated.
- `GradientText` — WhyUs numbered labels (01–04). Color: `--accent` → `--accent-light`.
- `ShinyText` — CTA button text and portfolio card badges. Shimmer direction: left-to-right.
- `BlurText` — Process section heading. `delay={60}` per word. One-time, `once: true`.
- `Aurora` — Contact section background only. Muted opacity (`0.12`), colors `--accent-muted` and `--bg-card`. Must be `dynamic()` imported, `ssr: false`.
- `GlowingCard` — Services and Portfolio cards. Override glow color to `--accent`.

---

## 11. 21ST.DEV COMPONENTS — MANUAL COPY REFERENCES

Browse these URLs, select the component that best matches the design system generated in Step 0, and copy the code directly into the relevant component file:

| Section | Browse URL | What to pick |
|---|---|---|
| NavBar blur effect | `21st.dev/community/components/s/navbar` | Sticky navbar with frosted glass + scroll detection |
| Hero background | `21st.dev/community/components/s/background-animation` | Subtle particle or mesh gradient (CSS-only preferred) |
| Portfolio cards | `21st.dev/community/components/s/card` | Tilt card or perspective hover card |
| TrustBar ticker | `21st.dev/community/components/s/scrolling-animation` | Infinite horizontal marquee |
| Section reveals | `21st.dev/community/components/s/animations` | Fade-up on scroll, stagger support |
| Text animations | `21st.dev/community/components/s/text-animation` | Word-by-word reveal for Process section |

**Selection criteria**: Pick the component with the fewest dependencies, cleanest TypeScript, and zero runtime CSS-in-JS. CSS module or Tailwind-only preferred. Inspect the bundle impact before committing.

---

## 12. ENVIRONMENT VARIABLES

```bash
# .env.example — all required, none optional at launch
RESEND_API_KEY=                    # Required — Resend API key
CONTACT_TO_EMAIL=                  # Required — inbox to receive leads
NEXT_PUBLIC_GA_ID=                 # Required — GA4 measurement ID (G-XXXXXXXXXX)
NEXT_PUBLIC_SITE_URL=              # Required — https://specsolutions.lk (or registered domain)
NEXT_PUBLIC_GSC_VERIFICATION=      # Optional — Google Search Console verification
NEXT_PUBLIC_WHATSAPP_NUMBER=       # Required — international format, no +, e.g. 94771234567
```

---

## 13. SECURITY HEADERS — `next.config.ts`

Add these headers to every response. The Next.js 14.x RSC vulnerabilities make this mandatory:

```typescript
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self' https://www.google-analytics.com https://api.resend.com",
    ].join('; '),
  },
];
```

---

## 14. GA4 TRACKING EVENTS — UPDATED FOR SPEC SOLUTIONS

| Event | Trigger | Params |
|---|---|---|
| `cta_click` | Hero primary CTA | `{ cta_label: 'Book Discovery Call', section: 'hero' }` |
| `cta_click` | Hero secondary CTA | `{ cta_label: 'See Our Work', section: 'hero' }` |
| `cta_click` | NavBar CTA | `{ cta_label: 'Book Discovery Call', section: 'navbar' }` |
| `service_click` | Services card arrow | `{ service: 'web_app' | 'automation' | 'audit' }` |
| `portfolio_view` | Portfolio card visible for > 2s | `{ project: 'medflow' | 'academiq' }` |
| `whatsapp_click` | WhatsApp FAB | `{ source: 'fab' }` |
| `form_submit` | Contact form | `{ goal: string, status: 'success' | 'error' }` |
| `scroll_depth` | 25% / 50% / 75% / 100% | `{ depth: number }` |

---

## 15. PRE-LAUNCH CHECKLIST

### Identity & Content
- [ ] Replace all placeholder founder data in `Team.tsx` (names, roles, bios, LinkedIn URLs)
- [ ] Add real founder headshots — square, min 500×500px, WebP format, < 80KB
- [ ] Replace placeholder email in `Contact.tsx` and footer
- [ ] Replace placeholder phone in `Contact.tsx`
- [ ] Set real WhatsApp number in `WhatsAppButton.tsx` and `.env`
- [ ] Write final H1 and sub-copy with actual company voice — the placeholder copy above is a starting point
- [ ] Replace `NEXT_PUBLIC_SITE_URL` with registered domain (recommend `specsolutions.lk` or `.com`)

### Assets
- [ ] Add real mockup images: `/public/mockup-clinic.png` and `/public/mockup-education.png` — min 1200px wide, WebP, < 120KB each
- [ ] Generate OG image: `/public/og-image.png` — 1200×630px, dark background, logo + tagline
- [ ] Generate favicon set: `favicon.svg`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`

### Infrastructure
- [ ] Add `RESEND_API_KEY` to Vercel environment variables
- [ ] Verify sending domain in Resend dashboard
- [ ] Set `CONTACT_TO_EMAIL` in Vercel
- [ ] Add `NEXT_PUBLIC_GA_ID` (G- prefix)
- [ ] Register in Google Search Console, add `NEXT_PUBLIC_GSC_VERIFICATION`
- [ ] Configure custom domain in Vercel — enable automatic HTTPS

### Quality Gates (must all pass before publishing the Lighthouse 95+ claim)
- [ ] Run `next build` — zero TypeScript errors, zero warnings
- [ ] Run `@next/bundle-analyzer` — client JS < 180KB gzipped
- [ ] Run Lighthouse in Chrome (incognito, desktop) — Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100
- [ ] Run Lighthouse mobile — Performance ≥ 88 (mobile budget is different; do not publish a "95+ mobile" claim without verifying)
- [ ] Test contact form with real Resend API — confirm email received
- [ ] Test WhatsApp FAB — confirm number is correct
- [ ] Test on iOS Safari 17+ and Chrome Android — no layout breaking, no horizontal scroll
- [ ] Test with `prefers-reduced-motion: reduce` enabled — all animations must be static
- [ ] Verify Open Graph preview on WhatsApp and Facebook (use `og:debugger` and Meta Sharing Debugger)
- [ ] Check `sitemap.xml` at `/sitemap.xml` and `robots.txt` at `/robots.txt`

---

## 16. IMPLEMENTATION ORDER

Build in this sequence to avoid rework:

1. **Design system** — Run Step 0 commands. Generate `design-system/MASTER.md`.
2. **Tokens** — Update `globals.css` and `tailwind.config.ts` with Spec Solutions palette.
3. **Logo** — Build `Logo.tsx` (SVG, both lockups).
4. **Layout** — `app/layout.tsx` (metadata, fonts, GA4, WhatsApp FAB).
5. **NavBar** — `NavBar.tsx` (copy 21st.dev component, adapt to design system).
6. **Hero** — `Hero.tsx` — STATIC, no motion imports.
7. **TrustBar** — Marquee, CSS animation only.
8. **Services** — 3-card grid with Framer Motion stagger.
9. **Install ReactBits components** — run install commands from Section 10.
10. **ProblemSolution** — 3-card grid, gold dividers.
11. **Portfolio** — 2-card tilt grid (21st.dev), ReactBits ShinyText badges.
12. **Process** — Vertical timeline with Framer Motion scroll-gated line.
13. **WhyUs** — Numbered rows, ReactBits GradientText labels.
14. **Team** — 2-founder cards, placeholder-ready.
15. **Contact** — Form + API route + Resend.
16. **Footer** — Stacked logo, links, tagline.
17. **Analytics** — `Analytics.tsx`, `trackEvent()`, all events wired.
18. **SEO** — `robots.ts`, `sitemap.ts`, full metadata.
19. **Security headers** — `next.config.ts`.
20. **Bundle analysis + Lighthouse audit** — fix until 95+.
21. **Pre-launch checklist** — complete every item in Section 15.