import Logo from '@/components/ui/Logo'

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-bg-base" role="status" aria-label="Loading">
      <div className="motion-safe:animate-pulse">
        <Logo variant="symbol" height={56} priority />
      </div>
    </div>
  )
}
