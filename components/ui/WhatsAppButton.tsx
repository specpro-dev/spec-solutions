'use client'

import { trackEvent } from '@/lib/analytics'

// WhatsApp floating action button.
// Uses the official WhatsApp green (#25D366) and logo — intentionally NOT
// reskinned to the navy palette. Familiarity with the WhatsApp visual identity
// is more important than brand consistency here; users need to instantly
// recognize it as a tap-to-WhatsApp button.

const WHATSAPP_NUMBER = '94700000000' // PLACEHOLDER: replace with real number before launch
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi, I'm interested in a website for my institute/business."
)
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      id="whatsapp-fab"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onClick={() =>
        trackEvent('whatsapp_click', {
          label: 'floating_button',
          destination: 'whatsapp',
        })
      }
      className="fixed bottom-6 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-transform duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
      style={{ backgroundColor: '#25D366' }}
    >
      {/* Official WhatsApp logo SVG */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 2C8.268 2 2 8.268 2 16c0 2.468.668 4.78 1.832 6.768L2 30l7.434-1.8A13.928 13.928 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 4.4c-6.4 0-11.6 5.2-11.6 11.6 0 2.168.6 4.2 1.64 5.936L4.8 27.2l5.424-1.216A11.548 11.548 0 0 0 16 27.6c6.4 0 11.6-5.2 11.6-11.6S22.4 4.4 16 4.4Zm6.8 15.968c-.28.784-1.6 1.496-2.2 1.544-.56.048-1.08.264-3.64-.76-3.08-1.24-5.04-4.4-5.192-4.6-.152-.2-1.24-1.648-1.24-3.144 0-1.496.784-2.232 1.064-2.536.28-.304.608-.376.808-.376.2 0 .4.002.576.01.2.008.456-.076.712.544.28.656.944 2.304.96 2.432.016.128.024.28-.064.432-.088.152-.136.248-.272.384-.136.136-.288.304-.408.408-.136.12-.28.248-.12.488.16.24.712 1.176 1.528 1.904 1.048.944 1.928 1.24 2.2 1.368.272.128.432.112.592-.064.16-.176.68-.792.864-1.064.184-.272.368-.224.616-.136.248.088 1.576.744 1.848.88.272.136.448.2.512.312.064.112.064.656-.216 1.44Z"
          fill="#25D366"
        />
      </svg>
    </a>
  )
}
