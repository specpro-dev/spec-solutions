/** 0 → "01": the numbering used on every list of steps, services and screens. */
export function ordinal(index: number) {
  return String(index + 1).padStart(2, '0')
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}
