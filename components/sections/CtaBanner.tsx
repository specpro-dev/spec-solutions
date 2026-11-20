import Image from 'next/image'
import { ArrowRight, MessageCircle } from 'lucide-react'
import ContactLink from '@/components/ui/ContactLink'
import { Reveal } from '@/components/ui/Reveal'
import WhatsAppLink from '@/components/ui/WhatsAppLink'

export default function CtaBanner() {
  return (
    // Full-bleed: the photo runs edge to edge; bg-bg-base is the dark fallback while it loads.
    <section aria-label="Start a project" className="theme-ink relative overflow-hidden bg-bg-base">
      <Image
        src="/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[70%_50%]"
      />
      {/* Darkens the bright daylight photo behind the copy; lighter on the right so the wireframe still shows. */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40 md:via-black/60 md:to-black/0"
        aria-hidden="true"
      />

      <Reveal className="page-container relative section-py">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">No commitment required</p>
          <h2 className="section-title max-w-[20ch]">Start with a 30-minute discovery call.</h2>
          <p className="mt-4 text-base md:text-lg text-white/80 max-w-[46ch]">
            Tell us what you&apos;re trying to fix. We&apos;ll say honestly whether we&apos;re the right team, and if
            we are, you&apos;ll leave with a rough scope, timeline and budget range.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ContactLink
              track={{ event: 'cta_click', params: { label: 'banner_contact', location: 'cta_banner' } }}
              className="btn btn-primary"
            >
              Book the call
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </ContactLink>
            <WhatsAppLink location="cta_banner" className="btn btn-secondary">
              <MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />
              Chat on WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
