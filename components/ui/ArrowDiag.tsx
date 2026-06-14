export function ArrowDiag({ size = 12, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="1" y1="9" x2="9" y2="1" />
      <polyline points="3,1 9,1 9,7" />
    </svg>
  )
}
