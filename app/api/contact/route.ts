import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Contact form API route → Resend email delivery
//
// ⚠️  RATE LIMITING WARNING:
//     This route has no rate limiting. A script can POST to /api/contact
//     hundreds of times per minute. For a new site this is acceptable, but
//     add rate limiting before the site sees real traffic. Options:
//       - Vercel Rate Limiting (Pro plan)
//       - IP-based counter in Redis/KV
//       - Cloudflare WAF rules (free tier available)

// Validate that required env vars exist at request time (not build time)
// Resend is instantiated lazily inside the handler — NOT at module level —
// because process.env.RESEND_API_KEY isn't available during `next build`.
function getConfig() {
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL

  if (!apiKey || apiKey === 're_xxxxxxxxxxxxxxxxxxxx') {
    return { error: 'RESEND_API_KEY is not configured.' as const }
  }
  if (!toEmail) {
    return { error: 'CONTACT_TO_EMAIL is not configured.' as const }
  }
  return { apiKey, toEmail }
}

interface ContactFormData {
  name: string
  businessName: string
  phone: string
  goal: string
}

// Server-side field validation
function validateBody(body: unknown): body is ContactFormData {
  if (!body || typeof body !== 'object') return false
  const b = body as Record<string, unknown>
  return (
    typeof b.name === 'string' && b.name.trim().length > 0 &&
    typeof b.businessName === 'string' && b.businessName.trim().length > 0 &&
    typeof b.phone === 'string' && b.phone.trim().length > 0 &&
    typeof b.goal === 'string' && b.goal.trim().length > 0
  )
}

export async function POST(request: NextRequest) {
  // Check config first — return a server-side error if env vars are missing
  const config = getConfig()
  if ('error' in config) {
    console.error('[contact] Config error:', config.error)
    return NextResponse.json(
      { error: 'The contact form is not configured yet. Please email us directly.' },
      { status: 500 }
    )
  }

  // Parse and validate request body
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!validateBody(body)) {
    return NextResponse.json(
      { error: 'Please fill in all required fields.' },
      { status: 400 }
    )
  }

  const { name, businessName, phone, goal } = body

  // Send email via Resend (instantiated per-request, not at module level)
  const resend = new Resend(config.apiKey)
  try {
    const { error } = await resend.emails.send({
      from: 'Spec Solutions <onboarding@resend.dev>', // PLACEHOLDER: Change to your verified domain before launch
      to: [config.toEmail],
      subject: `New lead: ${businessName} — ${goal}`,
      text: `
New contact form submission from nextintakedigital.com

Name: ${name}
Business: ${businessName}
Phone: ${phone}
Goal: ${goal}

Submitted at: ${new Date().toISOString()}
      `.trim(),
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 520px; padding: 24px;">
          <h2 style="color: #0F1B3C; margin-top: 0;">New lead from nextintakedigital.com</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6B7280; font-size: 13px; width: 120px;">Name</td>
              <td style="padding: 8px 0; font-weight: 600; color: #111;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Business</td>
              <td style="padding: 8px 0; font-weight: 600; color: #111;">${businessName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Phone</td>
              <td style="padding: 8px 0; font-weight: 600; color: #111;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Goal</td>
              <td style="padding: 8px 0; font-weight: 600; color: #C9963A;">${goal}</td>
            </tr>
          </table>
          <p style="color: #9CA3AF; font-size: 12px; margin-top: 24px;">
            Submitted at ${new Date().toLocaleString('en-LK', { timeZone: 'Asia/Colombo' })} (Sri Lanka time)
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send your message. Please try emailing us directly.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again or email us directly.' },
      { status: 500 }
    )
  }
}
