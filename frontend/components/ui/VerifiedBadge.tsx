export default function VerifiedBadge({ size = 16 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full bg-verified text-[#0b3d1e] shrink-0"
      style={{ width: size, height: size }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12l5 5L20 7" />
      </svg>
    </span>
  );
}
