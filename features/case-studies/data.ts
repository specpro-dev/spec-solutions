// Case studies shown on the home page (CaseStudies section) and at /case-studies/[slug].
//
// Drafted from the project details that were on the old Portfolio cards. Lines marked
// CONFIRM are reasonable guesses, not known facts: check them with the client (and get
// their OK to be named) before this goes live.

export interface CaseStudySection {
  heading: string
  paragraphs: string[]
  points?: string[]
}

export interface CaseStudy {
  slug: string
  client: string
  industry: string
  location: string
  title: string
  summary: string
  published: string // ISO date
  cover: { src: string; alt: string }
  // Screens for the scroll-story layout, in the order they scroll past. Captions describe
  // only what the screen shows.
  walkthrough: { src: string; width: number; height: number; caption: string }[]
  // Short lines for the home page scroll story.
  highlights: { problem: string; why: string }
  liveUrl: string
  services: string[]
  sections: CaseStudySection[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'a2a-services-bulk-catering-orders',
    client: 'A2A Services',
    industry: 'Institutional catering',
    location: 'United Kingdom',
    title: 'How a UK caterer moved bulk ordering online',
    summary:
      'An ordering platform where institutions build bulk orders and pay online, while the catering team runs menus from a live back office.',
    published: '2026-11-21',
    cover: {
      src: '/a2a-cover.jpeg',
      alt: 'A2A Services ordering app showing the menu grid with portion sizes, the order summary and the checkout steps',
    },
    walkthrough: [
      { src: '/case-studies/a2a-screen.jpg', width: 958, height: 510, caption: 'The ordering app, set up for each customer site' },
      { src: '/case-studies/a2a-menu.jpg', width: 782, height: 349, caption: 'Menus with portion sizes and dietary tags' },
      { src: '/case-studies/a2a-order.jpg', width: 431, height: 510, caption: 'A saved order and a four-step checkout' },
    ],
    highlights: {
      // CONFIRM: same guess as "The situation" below.
      problem: 'Bulk orders were put together outside any system, so they were slow to confirm and easy to get wrong.',
      why: 'Bulk orders are built over days, so nothing a customer adds should ever be lost.',
    },
    liveUrl: 'https://a2aservicesltd.co.uk/',
    services: ['Business Systems'],
    sections: [
      {
        heading: 'The situation',
        paragraphs: [
          'A2A Services is a UK catering company that supplies meals to institutions. Their customers don’t order one lunch at a time. They order for a whole site, for a set delivery date, across several dishes and portion sizes.',
          // CONFIRM: how orders arrived before the platform (email, phone, spreadsheets?).
          'Orders like that take time to put together, and they usually go through more than one person before they’re final. Before the platform, that back-and-forth happened outside any system, which made orders slow to confirm and easy to get wrong.',
        ],
      },
      {
        heading: 'What we built',
        paragraphs: [
          'A web app where customers browse the menu, build an order and pay for it in one place, plus a back office the catering team runs themselves.',
        ],
        points: [
          'A menu with portion sizes and dietary details on every dish',
          'A cart that saves between sessions, so a bulk order can be built over several days',
          'Checkout with delivery date, time and notes, paid through PayPal',
          'A Firestore back office where the team updates menus, galleries and enquiries, and the site changes straight away',
          'Separate ordering flows for each type of customer',
        ],
      },
      {
        heading: 'Why it’s built this way',
        paragraphs: [
          'Bulk orders are assembled, not placed. Someone starts a list, checks numbers with a colleague and comes back later. A cart that disappears when the tab closes forces them to start again, so saving the cart between sessions mattered more than any visual polish.',
          'Different customers order in different ways. Rather than one checkout with a growing pile of special cases, each customer type has its own flow on shared building blocks. Adding a new kind of customer means adding a flow, not rebuilding the ordering system.',
          'Menus change every week. If every change needs a developer, the website falls behind the kitchen. Putting menus, galleries and enquiries in a back office the team controls keeps the site accurate without anyone waiting on us.',
        ],
      },
      {
        heading: 'What changed',
        // CONFIRM: replace or add to this with real results from the client (order volume, time saved, fewer errors).
        paragraphs: [
          'Customers can now put together, pay for and schedule a bulk order without waiting on a reply. The catering team changes what’s on the menu themselves, and new customer types can be added as the business grows.',
        ],
      },
    ],
  },
  {
    slug: 'dealsbuzz-pre-orders-with-deposit',
    client: 'DealsBuzz',
    industry: 'Footwear retail',
    location: 'Sri Lanka',
    title: 'Selling stock before it lands: pre-orders with a 30% deposit',
    summary:
      'An online store for a Sri Lankan footwear retailer, built around pre-orders so new stock is sold before it arrives.',
    published: '2026-11-21',
    cover: {
      src: '/dealsbuzz-cover.jpeg',
      alt: 'DealsBuzz online store home page showing a lifestyle banner and product categories for sneakers, clogs, sandals and boots',
    },
    walkthrough: [
      { src: '/case-studies/dealsbuzz-screen.jpg', width: 726, height: 442, caption: 'The store home page' },
      { src: '/case-studies/dealsbuzz-hero.jpg', width: 726, height: 284, caption: 'Featured sections lead first-time visitors in' },
      { src: '/case-studies/dealsbuzz-categories.jpg', width: 726, height: 158, caption: 'Category browsing straight to a product' },
    ],
    highlights: {
      // CONFIRM: same guess as "The situation" below.
      problem: 'New stock had to be paid for before anyone knew which styles and sizes would sell.',
      why: 'A deposit turns interest into a commitment, so stock is ordered against real demand.',
    },
    liveUrl: 'https://www.dealsbuzz.lk/',
    services: ['Products & SaaS'],
    sections: [
      {
        heading: 'The situation',
        paragraphs: [
          // CONFIRM: that stock is imported in batches and paid for upfront.
          'DealsBuzz sells authentic Crocs and other footwear in Sri Lanka. New stock comes in batches, and it has to be paid for before a single pair is sold.',
          'That leaves a retailer guessing: which styles, which sizes and how many. Guess wrong and money sits on the shelf. Guess too low and customers who wanted a pair go elsewhere.',
        ],
      },
      {
        heading: 'What we built',
        paragraphs: [
          'An online store designed around pre-orders, with the browsing and support features a first-time customer needs to trust it.',
        ],
        points: [
          'Pre-orders on incoming stock, secured with a 30% deposit',
          'Category browsing and featured sections that lead first-time visitors to a product',
          'Size guides on product pages',
          'Order tracking, so customers can check where a pre-order is without asking',
        ],
      },
      {
        heading: 'Why a deposit, not just a waiting list',
        paragraphs: [
          'A waiting list tells you who is curious. A deposit tells you who will buy. At 30%, it’s enough for a customer to commit, but small enough that paying in advance for something they can’t hold yet doesn’t feel like a risk.',
          'It also changes the stock decision. Pre-orders arrive with a style and size attached, so the retailer orders against real demand instead of last season’s guess, and part of the cost is covered before the shipment is paid for.',
        ],
      },
      {
        heading: 'Answering questions before they’re asked',
        paragraphs: [
          'Buying shoes online raises two questions: will they fit, and when will they arrive? A pre-order makes the second one sharper, because the customer has already paid part of the price.',
          'Size guides on the product page and tracking on every order answer both without a message to the shop. That matters for a small team, where every “where’s my order?” message is time away from running the business.',
        ],
      },
      {
        heading: 'What changed',
        // CONFIRM: replace or add to this with real results (share of sales from pre-orders, unsold stock, support messages).
        paragraphs: [
          'New stock can now be sold before it arrives, with deposits taken online. Customers find products through categories and featured sections, and check fit and delivery status themselves.',
        ],
      },
    ],
  },
]

export function getCaseStudy(slug: string) {
  return caseStudies.find(study => study.slug === slug)
}

// Around 220 words a minute, rounded up.
export function readingMinutes(study: CaseStudy) {
  const text = study.sections.flatMap(s => [s.heading, ...s.paragraphs, ...(s.points ?? [])]).join(' ')
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 220))
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}
