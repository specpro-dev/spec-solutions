import { Resend } from 'resend'
import { site } from '@/config/site'
import { palettes } from '@/config/theme'
import { FIELDS, type ContactField, type ContactLead } from './schema'

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

function renderEmail(lead: ContactLead) {
  const fields = Object.keys(FIELDS) as ContactField[]
  const text = [
    `New contact form submission from ${site.displayName}`,
    '',
    ...fields.map(f => `${FIELDS[f].label}: ${lead[f]}`),
    '',
    `Submitted at: ${new Date().toISOString()}`,
  ].join('\n')

  const rows = fields
    .map(
      f => `
        <tr>
          <td style="padding: 8px 0; color: #6B7280; font-size: 13px; width: 120px;">${FIELDS[f].label}</td>
          <td style="padding: 8px 0; font-weight: 600; color: ${f === 'goal' ? palettes.light['accent-text'] : palettes.light['text-primary']};">${escapeHtml(lead[f])}</td>
        </tr>`
    )
    .join('')

  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 520px; padding: 24px;">
      <h2 style="color: ${palettes.light['text-primary']}; margin-top: 0;">New lead from ${site.displayName}</h2>
      <table style="width: 100%; border-collapse: collapse;">${rows}</table>
      <p style="color: #9CA3AF; font-size: 12px; margin-top: 24px;">
        Submitted at ${new Date().toLocaleString('en-LK', { timeZone: 'Asia/Colombo' })} (Sri Lanka time)
      </p>
    </div>`

  return { text, html }
}

type SendResult = { ok: true } | { ok: false; reason: 'not-configured' | 'failed' }

export async function sendLead(lead: ContactLead): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL
  if (!apiKey || !toEmail) {
    console.error('[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not configured.')
    return { ok: false, reason: 'not-configured' }
  }

  // Created per request: the key isn't available during `next build`.
  const resend = new Resend(apiKey)
  try {
    const { error } = await resend.emails.send({
      from: `${site.name} <onboarding@resend.dev>`, // Switch to a Resend-verified domain before launch.
      to: [toEmail],
      subject: `New lead: ${lead.businessName} — ${lead.goal}`,
      ...renderEmail(lead),
    })
    if (error) {
      console.error('[contact] Resend error:', error)
      return { ok: false, reason: 'failed' }
    }
    return { ok: true }
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return { ok: false, reason: 'failed' }
  }
}
