import { NextRequest, NextResponse } from 'next/server'
import { parseLead } from '@/features/contact/schema'
import { sendLead } from '@/features/contact/sendLead'

// No rate limiting yet: add Vercel rate limiting, a KV counter, or a Cloudflare
// WAF rule before the site sees real traffic.

const MESSAGES = {
  'not-configured': 'The contact form is not configured yet. Please email us directly.',
  failed: 'Failed to send your message. Please try emailing us directly.',
} as const

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { lead, errors } = parseLead(body)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Please fill in all required fields.', errors }, { status: 400 })
  }

  const result = await sendLead(lead)
  if (!result.ok) return NextResponse.json({ error: MESSAGES[result.reason] }, { status: 500 })
  return NextResponse.json({ success: true })
}
